'use strict';

var should = require('should');
var mocha = require('mocha');

describe('controllers', function(){

  describe('UserController', function(){
    var UserController = require('../../../api/controllers/UserController');

    it('should be an object', function(done){
      UserController.should.be.type('object');
      done();
    });

    it('should have a self property', function(done){
      UserController.should.have.property('self');
      done();
    });

  });

});
