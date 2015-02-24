(function() {
  'use strict';

  angular
    .module('app.user')
    .controller('UserTwitterOauth', UserTwitterOauth);

  /**
   * Handles redirection to remote locations
   */

  /* @ngInject */
  function UserTwitterOauth($location, $window, $http, localStorageService, logger) {
    var destination = localStorageService.get('destination', destination);
    var token = $location.search()['access_token'];

    if(typeof token !== 'undefined'){
      $http.get('/api/user/self?access_token=' + token).
        success(function(data, status, headers, config) {
          data.token = token;
          localStorageService.set('user', data);
          logger.success('Login Success', data);
          $window.location = destination ? destination : '/';
        }).
        error(function(data, status, headers, config) {
          $location.path(destination ? destination : '/');
          logger.error(data);
        });
    }
    else{
      $location.path(destination ? destination : '/');
      logger.error('An error occurred.');
    }
  }

})();
