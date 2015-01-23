(function() {
   'use strict';

   angular
    .module('app.user')
    .config(appConfig);

  function appConfig($stateProvider, userRoles) {
    $stateProvider.state('userTwitterOauth', {
      url: '/user/twitter/oauth',
      template: '<div><strong>Redirecting</strong> - Please wait...</div>',
      controller: 'UserTwitterOauth',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Redirect',
        access: userRoles.anon
      },
    });
  }

})();
