'use strict';

var should = require('should');
var mocha = require('mocha');

describe('UserModel',function(){
  var User = require('../../../api/models/User');

  describe('attributes', function(){
    var user = User.attributes;

    it('should be an object', function(done){
      user.should.be.type('object');
      done();
    });

    describe('.attempts', function(){
      it('should exist', function(done){
        user.should.have.property('attempts');
        done();
      });
    });

    describe('.tokens', function(){
      it('should exist', function(done){
        user.should.have.property('tokens');
        done();
      });
    });

    describe('.roles', function(){
      it('should exist', function(done){
        user.should.have.property('roles');
        done();
      });
    });

    describe('.auth', function(){
      it('should exist', function(done){
        user.should.have.property('auth');
        done();
      });
    });
  });
});
