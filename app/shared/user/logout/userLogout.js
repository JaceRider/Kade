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
    function controller($scope, logger, user) {

      $scope.logout = function(){
        logger.clear();
        logger.success('Logout Complete');
        user.logout();
      };

    }

  }

})();
