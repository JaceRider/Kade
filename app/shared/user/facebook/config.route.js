(function() {
   'use strict';

   angular
    .module('app.user')
    .config(appConfig);

  function appConfig($stateProvider, userRoles) {
    $stateProvider.state('userFacebookOauth', {
      url: '/user/facebook/oauth',
      template: '<div><strong>Redirecting</strong> - Please wait...</div>',
      controller: 'UserFacebookOauth',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Redirect',
        access: userRoles.anon
      },
    });
  }

})();
