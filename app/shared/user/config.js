(function() {
  'use strict';

  angular.module('app.user')
    .config(userConfig);

  /* @ngInject */
  function userConfig($httpProvider, localStorageServiceProvider) {
    $httpProvider.interceptors.push('userInterceptor');

    localStorageServiceProvider
      .setPrefix('user')
      .setStorageType('localStorage')
      .setNotify(false, false);
  }

})();
