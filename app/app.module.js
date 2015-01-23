(function() {
  'use strict';

  angular.module('app', [
    /*
     * Everybody has access to these.
     * We could place these under every feature area,
     * but this is easier to maintain.
     */
    'app.core',
    // 'app.widgets',

    /*
     * Feature areas
     */

    'app.ui',
    'app.user',
    'app.userManage',
    'app.home'
  ]);

})();
