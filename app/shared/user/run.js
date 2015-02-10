(function() {
  'use strict';

  angular.module('app.user')
    .run(userRun);

  /* @ngInject */
  function userRun($rootScope, $state, user, logger) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (toState.data.access && !user.authorize(toState.data.access)) {
        logger.error('You do not have permission to access this page.');
        event.preventDefault();
        $state.go('ui.home');
      }

      /**
       * Check for role access.
       */
      if (toState.data.accessHasRole && !user.hasRole(toState.data.accessHasRole)){
        logger.error('You do not have permission to access this page.');
        event.preventDefault();
      }

      /**
       * Check for roles access.
       */
      if (toState.data.accessHasRoles && !user.hasRoles(toState.data.accessHasRoles)){
        logger.error('You do not have permission to access this page.');
        event.preventDefault();
      }

      // if (!user.hasEmail()) {
      //   logger.error('You must provide an email address to continue.');
      //   event.preventDefault();
      //   $state.go('ui.home');
      // }
    });
  }

})();
