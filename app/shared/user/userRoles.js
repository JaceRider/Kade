(function() {
  'use strict';

  angular
    .module('app.user')
    .constant('userRoles', {
      anon: 0,
      user: 1,
      admin: 2
    }
  );

})();
