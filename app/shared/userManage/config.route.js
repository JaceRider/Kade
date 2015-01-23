(function() {
   'use strict';

   angular
    .module('app.userManage')
    .config(appConfig);

  function appConfig($stateProvider, userRoles) {

    $stateProvider.state('ui.users', {
      url: '/users',
      data: {
        pageTitle: 'Users',
        access: userRoles.user
      },
      views: {
        'content@ui': {
          templateUrl: 'partials/shared/userManage/userManage-list',
          controller: 'UserManage',
          controllerAs: 'vm',
        }
      }
    });

  }

})();
