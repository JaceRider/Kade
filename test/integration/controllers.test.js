'use strict';

var should = require('should')
  , mocha = require('mocha');

describe('templates', function(){
  describe('installed', function(){
    describe('controllers', function(){
      describe('AuthController', function(){
        var AuthController;
        it('should exist', function(done){
          AuthController = require('../../api/controllers/AuthController.js');
          AuthController.should.be.Object;
          done();
        });
        it('should have expected properties', function(done){
          AuthController.should.have.property('signup');
          AuthController.should.have.property('login');
          AuthController.should.have.property('twitter');
          AuthController.should.have.property('twitter_oauth');
          done();
        });
      });
      describe('PartialController', function(){
        var PartialController;
        it('should exist', function(done){
          PartialController = require('../../api/controllers/PartialController.js');
          PartialController.should.be.Object;
          done();
        });
        it('should have expected properties', function(done){
          PartialController.should.have.property('index');
          done();
        });
      });
      describe('RoleController', function(){
        var RoleController;
        it('should exist', function(done){
          RoleController = require('../../api/controllers/RoleController.js');
          RoleController.should.be.Object;
          done();
        });
        it('should have expected properties', function(done){
          RoleController.should.have.property('index');
          done();
        });
      });
      describe('UserController', function(){
        var UserController;
        it('should exist', function(done){
          UserController = require('../../api/controllers/UserController.js');
          UserController.should.be.Object;
          done();
        });
        it('should have expected properties', function(done){
          UserController.should.have.property('self');
          done();
        });
      });
    });
  });
});
