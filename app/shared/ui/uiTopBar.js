(function() {
  'use strict';

  angular
    .module('app.ui')
    .controller('UiTopBar', UiTopBar);

  /* @ngInject */
  function UiTopBar(user) {
    /*jshint validthis: true */
    var vm = this;

    vm.user = user;
  }

})();
