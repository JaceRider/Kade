'use strict';

var should = require('should');
var mocha = require('mocha');

describe('AuthController', function(){
  var AuthController = require('../../../api/controllers/AuthController');

  it('should be an object', function(done){
    AuthController.should.be.type('object');
    done();
  });

  it('should have a signup property', function(done){
    AuthController.should.have.property('signup');
    done();
  });

  it('should have a login property', function(done){
    AuthController.should.have.property('login');
    done();
  });

});
