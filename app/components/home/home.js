(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('Home', Home)
    .controller('HomeAuthenticated', HomeAuthenticated);

  /* @ngInject */
  function Home(user, logger) {
    /*jshint validthis: true */
    var vm = this;

    vm.user = user;

    vm.logout = function(){
      user.logout();
    }
  }

  /* @ngInject */
  function HomeAuthenticated($http, user, logger) {
    /*jshint validthis: true */
    var vm = this;

    vm.user = user;
    vm.message = '';

    $http.get('/api/auth/secure')
      .success(function(data, status, headers, config) {
        vm.message = data.message;
      })
      .error(function(data, status, headers, config) {
        console.log('error', data);
        // this callback will be called asynchronously
        // when the response is available
      })

    vm.logout = function(){
      user.logout();
    }
  }
})();
