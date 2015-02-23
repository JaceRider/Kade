(function() {
  'use strict';

  angular
    .module('app.user')
    .directive('userLogout', userLogin);

  /* @ngInject */
  function userLogin () {
    var directive = {
      // link: link,
      controller: controller,
      template: '<a class="user-logout" data-ng-click="logout()"><i class="fa fa-sign-out"></i> Logout</a>',
      restrict: 'E',
      replace: true,
      scope: true
    };
    return directive;

    /* @ngInject */
    function controller($scope, $state, logger, user) {

      $scope.logout = function(){
        logger.clear();
        user.logout().then(function(result){
          logger.success('Logout Success', result);
          // Go to the homepage.
          $state.go('ui.home');
        }, function(error) {
          logger.error('Logout Error', error);
          $scope.error = error;
        });
      };

    }

  }

})();
