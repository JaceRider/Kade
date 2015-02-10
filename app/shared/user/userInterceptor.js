(function() {
  'use strict';

  angular
    .module('app.user')
    .factory('userInterceptor', userInterceptor);

  /* @ngInject */
  function userInterceptor($q, $injector, logger) {
    var localStorageService = $injector.get('localStorageService');

    var service = {
      request: request,
      responseError: responseError
    };

    return service;

    function request(config){
      var token;
      if (localStorageService.get('user')) {
        token = angular.fromJson(localStorageService.get('user')).token;
      }
      if (token) {
        config.headers.access_token = token;
      }
      return config;
    }

    function responseError(response){
      if (response.status === 401) {
        logger.error('You do not have permission to access this page.');
        $injector.get('$state').go('ui.home');
      }
      if (response.status === 403) {
        logger.error('Your session has expired. Please log-in again.');
        localStorageService.remove('user');
        $injector.get('$state').go('ui.home');
      }
      return $q.reject(response);
    }
  }

})();
