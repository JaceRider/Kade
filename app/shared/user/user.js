(function() {
  'use strict';

  angular
    .module('app.user')
    .factory('user', user);

  /* @ngInject */
  function user($http, $q, $state, $sailsSocket, localStorageService, userRoles) {
    var service = {
      authorize: authorize,
      isAuthenticated: isAuthenticated,
      hasEmail: hasEmail,
      getCurrent: getCurrent,
      login: login,
      signup: signup,
      logout: logout,
      info: info
    };

    return service;

    /**
     * Check to see if a user allowed to access request.
     */
    function authorize(access) {
      console.log('userRoles', userRoles);
      if (access === userRoles.user) {
        return this.isAuthenticated();
      } else {
        return true;
      }
    }

    /**
     * Check to see if a user allowed to access request.
     */
    function hasEmail() {
      if (this.isAuthenticated() && (typeof this.getCurrent().auth.email === 'undefined')) {
        return false;
      } else {
        return true;
      }
    }

    /**
     * Check to see if a user is currently logged in.
     */
    function isAuthenticated() {
      return this.getCurrent() ? 1 : 0;
    }

    /**
     * Get current user.
     */
    function getCurrent() {
      return localStorageService.get('user') ? localStorageService.get('user') : 0;
    }

    function login(user) {
      var deferred = $q.defer();

      $sailsSocket.post('/api/auth/login', user).
        success(function(data, status, headers, config) {
          localStorageService.set('user', data);
          deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
          deferred.reject(data);
        });

      return deferred.promise;
    }

    function signup(user) {
      var deferred = $q.defer();

      $sailsSocket.post('/api/auth/signup', user).
        success(function(data, status, headers, config) {
          localStorageService.set('user', data);
          deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
          deferred.reject(data);
        });

      return deferred.promise;
    }

    function logout(){
      // The backend doesn't care about logouts, delete the token and you're good to go.
      localStorageService.remove('user');
      // Go to the homepage.
      $state.go('ui.home');
    }

    function info(){
      if (localStorageService.get('user')) {
        return localStorageService.get('user').auth;
      } else {
        return {};
      }
    }
  }

})();
