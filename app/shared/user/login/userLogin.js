(function() {
  'use strict';

  angular
    .module('app.user')
    .directive('userLogin', userLogin);

  /* @ngInject */
  function userLogin () {
    var directive = {
      // link: link,
      controller: controller,
      templateUrl: 'partials/shared/user/login/userLogin',
      restrict: 'E',
      replace: true,
      scope: true
    };
    return directive;

    /* @ngInject */
    function controller($scope, logger, user) {

      $scope.user = {};
      $scope.errors = {};
      $scope.login = login;

      $scope.user.email = 'email@site.com';
      $scope.user.password = '2600';

      function login(form){
        $scope.errors = {};
        user.login({
          'email': $scope.user.email,
          'password': $scope.user.password
        }).then(function(result){
          logger.success('Login Success', result);
        }, function(error) {
          logger.error('Login Error', error);
          $scope.error = error;
        });
      }
    }

  }

})();
