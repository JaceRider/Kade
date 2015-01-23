(function() {
   'use strict';

   angular
    .module('app.ui')
    .config(appConfig);

  function appConfig($stateProvider, userRoles) {

    $stateProvider.state('ui', {
      abstract: true,
      views: {
        '': {
          templateUrl: 'partials/shared/ui/ui-wrapper'
        },
        'topbar@ui': {
          templateUrl: 'partials/shared/ui/ui-topbar',
          controller: 'UiTopBar',
          controllerAs: 'vm'
        }
      }
    });

  }

})();
