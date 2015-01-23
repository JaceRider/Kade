(function() {
  'use strict';

  angular
    .module('app.user')
    .directive('userSignup', userSignup);

  /* @ngInject */
  function userSignup () {
    var directive = {
      // link: link,
      controller: controller,
      templateUrl: 'partials/shared/user/signup/userSignup',
      restrict: 'E',
      replace: true,
      scope: true
    };
    return directive;

    /* @ngInject */
    function controller($scope, logger, user) {

      $scope.user = {};
      $scope.error = {};
      $scope.signup = signup;
      $scope.errorCheck = errorCheck;

      $scope.user.email = 'Test@test.com';
      $scope.user.password = '2600';
      $scope.user.passwordConfirm = '2600';

      function signup(form){
        $scope.error = {};
        user.signup({
          'email': $scope.user.email,
          'password': $scope.user.password,
          'passwordConfirm': $scope.user.passwordConfirm
        }).then(function(result){
          logger.success('Signup Success', result);
        }, function(error) {
          logger.error('Signup Error', error);
          $scope.error = error;
        });
      }

      function errorCheck( type ){
        return $scope.error.type && $scope.error.type == type;
      }
    }

  }

})();
