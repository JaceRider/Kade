(function() {
   'use strict';

   angular
    .module('app.home')
    .config(appConfig);

  function appConfig($stateProvider, userRoles) {

    $stateProvider.state('ui.home', {
      url: '/',
      data: {
        pageTitle: 'Homepage',
        access: userRoles.anon
      },
      views: {
        'content@ui': {
          templateUrl: 'partials/components/home/home',
          controller: 'Home',
          controllerAs: 'vm',
        }
      }
    });

    $stateProvider.state('ui.home-authenticated', {
      url: '/authenticated',
      data: {
        pageTitle: 'Authenticated',
        access: userRoles.user
      },
      views: {
        'content@ui': {
          templateUrl: 'partials/components/home/home-authenticated',
          controller: 'HomeAuthenticated',
          controllerAs: 'vm',
        }
      }
    });

    $stateProvider.state('ui.home-admin', {
      url: '/admin',
      data: {
        pageTitle: 'Admin',
        accessHasRoles: [1,2]
        // accessHasRole: 1
        // access: userRoles.user
      },
      views: {
        'content@ui': {
          templateUrl: 'partials/components/home/home-admin',
          controller: 'HomeAdmin',
          controllerAs: 'vm',
        }
      }
    });

  }

})();
