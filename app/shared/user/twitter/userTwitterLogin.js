(function() {
  'use strict';

  angular
    .module('app.user')
    .directive('userTwitterLogin', userTwitterLogin);

  /* @ngInject */
  function userTwitterLogin () {
    var directive = {
      // link: link,
      controller: controller,
      template: '<a data-ng-click="login()" data-ng-hide="twitter()"><i class="fa fa-twitter"></i> {{ label }} with Twitter</a>',
      restrict: 'E',
      replace: true,
      scope: true
    };
    return directive;

    /* @ngInject */
    function controller($scope, $location, $window, localStorageService, user) {
      var current = $location.$$path;

      $scope.label = user.isAuthenticated() ? 'Connect' : 'Login';

      $scope.login = function(){
        localStorageService.set('destination', current);
        $window.location = '/api/auth/twitter';
      };

      $scope.twitter = function(){
        return user.isAuthenticated() && (typeof user.getCurrent().auth.twitterId !== 'undefined');
      };

    }

  }

})();
