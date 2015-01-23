(function() {
  'use strict';

  angular.module('app.user')
    .run(userRun);

  /* @ngInject */
  function userRun($rootScope, $state, user, logger) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (!user.authorize(toState.data.access)) {
        logger.error('You do not have permission to access this page.');
        event.preventDefault();
        $state.go('ui.home');
      }

      // if (!user.hasEmail()) {
      //   logger.error('You must provide an email address to continue.');
      //   event.preventDefault();
      //   $state.go('ui.home');
      // }
    });
  }

})();
