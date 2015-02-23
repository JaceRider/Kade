/*global _ */

(function() {
  'use strict';

  angular
    .module('app.userManage')
    .controller('UserManage', UserManage);

  /* @ngInject */
  function UserManage($scope, userService, uiGridConstants, logger) {
    /*jshint validthis: true */
    var vm = this;
    vm.users = [];
    vm.selected = {};

    vm.showMe = function(row) {
      console.log('row', row);
       // alert('clicked');
    };

    vm.grid = {
      data: {},
      enableFiltering: true,
      enableRowSelection: true,
      enableSelectAll: true,
      multiSelect: true,
      selectionRowHeaderWidth: 35,
      showGridFooter:true,
      onRegisterApi: onGridRegisterApi,
      columnDefs: [
        {field: 'auth.screenName', displayName: 'Screen Name'},
        {field: 'auth.name', displayName: 'Name'},
        {field: 'auth.email', displayName: 'Email'},
        {field: 'createdAt', displayName: 'Created', cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD | date:"MM/dd/yyyy \'at\' h:mma"}}</div>'},
        {name: 'Operations', enableFiltering: false, enableColumnMenu: false, cellTemplate:'<div class="ui-grid-cell-contents"><a class="btn primary" ng-click="grid.appScope.vm.showMe(row)"><i class="fa fa-edit"></i></a></div>' }
      ]
    };

    activate();

    function edit(){

    }

    function onGridRegisterApi(gridApi) {
      vm.gridApi = gridApi;
      console.log(gridApi);

      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        console.log(row);
        if(row.isSelected){
          vm.selected[row.uid] = row.entity;
        }
        else{
          delete vm.selected[row.uid];
        }
      });

      gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
        var msg = 'rows changed ' + rows.length;
        vm.selected = {};
        _.forEach(rows, function(row){
          vm.selected[row.uid] = row.entity;
        });
      });
    }

    function activate() {
      return getUsers().then(function() {
        logger.log('Activated Users Manage View');
      });
    }

    function getUsers(){
      return userService.getUsers().then(function(data) {
        console.log('data', data);
        vm.users = data;
        vm.grid.data = data;
        return vm.users;
      });
    }
  }

})();
