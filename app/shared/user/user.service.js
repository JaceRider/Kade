(function() {
  'use strict';

  angular
    .module('app.user')
    .factory('userService', userService);

  /* @ngInject */
  function userService($http, $location, $q, exception, logger) {
    var isPrimed = false;
    var primePromise;

    var service = {
      getUsers: getUsers,
      ready: ready
    };

    return service;

    function getUsers() {
      return $http.get('/api/user')
        .then(getUsersComplete)
        .catch(function(message) {
          exception.catcher('XHR Failed for getUsers')(message);
          $location.url('/');
        });

      function getUsersComplete(data, status, headers, config) {
        return data.data;
      }
    }

    function prime() {
      if (primePromise) {
        return primePromise;
      }

      primePromise = $q.when(true).then(success);
      return primePromise;

      function success() {
        isPrimed = true;
        logger.info('Primed data');
      }
    }

    function ready(nextPromises) {
      var readyPromise = primePromise || prime();

      return readyPromise
        .then(function() { return $q.all(nextPromises); })
        .catch(exception.catcher('"ready" function failed'));
    }

  }
})();
