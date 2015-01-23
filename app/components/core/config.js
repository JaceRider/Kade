(function() {
  'use strict';

  var core = angular.module('app.core');

  core.config(toastrConfig);

  /* @ngInject */
  function toastrConfig(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-full-width';
  }

  var config = {
    appErrorPrefix: '[NG-Modular Error] ', //Configure the exceptionHandler decorator
    appTitle: 'SITE TITLE',
    version: '1.0.0'
  };

  core.value('config', config);

  core.config(configure);

  /* @ngInject */
  function configure ($logProvider, $stateProvider, exceptionHandlerProvider) {
    // turn debugging off/on (no info or warn)
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }

    // // Configure the common route provider
    // routehelperConfigProvider.config.$stateProvider = $stateProvider;
    // routehelperConfigProvider.config.docTitle = 'NG-Modular: ';
    // var resolveAlways = { /* @ngInject */
    //   ready: function(dataservice) {
    //     return dataservice.ready();
    //   }
    // };
    // routehelperConfigProvider.config.resolveAlways = resolveAlways;

    // Configure the common exception handler
    exceptionHandlerProvider.configure(config.appErrorPrefix);
  }
})();
