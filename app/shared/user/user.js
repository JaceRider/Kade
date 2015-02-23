(function() {
  'use strict';

  angular
    .module('app.user')
    .factory('user', user);

  /* @ngInject */
  function user($http, $q, $sailsSocket, localStorageService, userRoles) {
    var service = {
      authorize: authorize,
      isAuthenticated: isAuthenticated,
      hasRole: hasRole,
      hasRoles: hasRoles,
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
      if (access === userRoles.user) {
        return this.isAuthenticated();
      } else {
        return true;
      }
    }

    /**
     * Check to see if user has role.
     */
    function hasRole(roleId){
      var user = this.getCurrent();
      if(typeof user.roles !== 'object'){
        return false;
      }
      return user.roles.indexOf(roleId) > -1;
    }

    /**
     * Check to see if user has role.
     */
    function hasRoles(roleIds){
      var user = this.getCurrent();

      if(roleIds.length !== user.roles.length){
        return false;
      }

      return user.roles.every(function(roleId) {
        return user.roles.indexOf(roleId) > -1;
      });
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
      var deferred = $q.defer();

      $sailsSocket.get('/api/auth/logout', status).
        success(function(data, status, headers, config) {
          localStorageService.remove('user');
          deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
          deferred.reject(data);
        });
      return deferred.promise;
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
