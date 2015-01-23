(function() {
  'use strict';

  angular
    .module('blocks.router')
    .config(routehelperConfig)
    .run(routehelperRun);

  function routehelperConfig($provide, $locationProvider, $urlRouterProvider, $stateProvider) {
    // Use HTML5 Urls
    $locationProvider.html5Mode(true);
    // Return all non-matching routes to the homepage.
    $urlRouterProvider.otherwise('/');
  }

  function routehelperRun($rootScope, $state, $stateParams) {
    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }

})();
