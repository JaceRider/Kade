(function() {
  'use strict';

  angular
    .module('app.user')
    .controller('UserFacebookOauth', UserFacebookOauth);

  /**
   * Handles redirection to remote locations
   */

  /* @ngInject */
  function UserFacebookOauth($location, $window, $sailsSocket, localStorageService, logger) {
    var destination = localStorageService.get('destination', destination);
    var token = $location.search()['token'];

    if(typeof token !== 'undefined'){
      $sailsSocket.get('/api/user/self?access_token=' + token).
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
