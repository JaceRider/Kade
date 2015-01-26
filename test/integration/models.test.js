'use strict';

var should = require('should')
  , mocha = require('mocha');

describe('templates', function(){
  describe('installed', function(){
    describe('models', function(){
      describe('Attempt', function() {
        var Attempt;
        it('should exist', function(done){
          Attempt = require('../../api/models/Attempt');
          Attempt.should.be.Object;
          done();
        });
        it('should have expected properties', function(done){
          Attempt.attributes.should.have.property('user');
          Attempt.attributes.should.have.property('successful');
          Attempt.attributes.should.have.property('ip');
          Attempt.attributes.should.have.property('port');
          done();
        });
      });
      describe('Auth', function() {
        var Auth;
        it('should exist', function(done){
          Auth = require('../../api/models/Auth');
          Auth.should.be.Object;
          done();
        });
        it('should have expected properties', function(done){
          Auth.attributes.should.have.property('user');
          Auth.attributes.should.have.property('email');
          Auth.attributes.should.have.property('password');
          done();
        });
      });
      describe('Role', function() {
        var Role;
        it('should exist', function(done){
          Role = require('../../api/models/Role');
          Role.should.be.Object;
          done();
        });
        it('should have expected properties', function(done){
          Role.attributes.should.have.property('user');
          Role.attributes.should.have.property('role');
          done();
        });
      });
      describe('Token', function() {
        var Token;
        it('should exist', function(done){
          Token = require('../../api/models/Token');
          Token.should.be.Object;
          done();
        });
        it('should have expected properties', function(done){
          Token.attributes.should.have.property('uses');
          Token.attributes.should.have.property('owner');
          Token.attributes.should.have.property('revoked');
          done();
        });
      });
      describe('TokenUse', function() {
        var TokenUse;
        it('should exist', function(done){
          TokenUse = require('../../api/models/TokenUse');
          TokenUse.should.be.Object;
          done();
        });
        it('should have expected properties', function(done){
          TokenUse.attributes.should.have.property('remoteAddress');
          TokenUse.attributes.should.have.property('token');
          done();
        });
      });
      describe('User', function() {
        var User;
        it('should exist', function(done){
          User = require('../../api/models/User');
          User.should.be.Object;
          done();
        });
        it('should have expected properties', function(done){
          User.attributes.should.have.property('attempts');
          User.attributes.should.have.property('tokens');
          User.attributes.should.have.property('roles');
          User.attributes.should.have.property('auth');
          done();
        });
      });
    });
  });
});
