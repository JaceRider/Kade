'use strict';

var request = require('supertest');

describe('RoleModel', function(){
  var AuthModel;
  var user;

  describe('create user', function() {
    it('should return success', function (done) {
      sails.services.auth.getUserAuthObject({email:'email@site.com',password:'2600'}, true, function(err, _user){
        sails.models.user.should.be.Object;
        user = _user;
        done();
      });
    });
  });

  describe('add role 1', function() {
    it('should return role', function (done) {
      sails.models.role.addToUser(user, 1, function(err, role){
        role.should.be.ok;
        role.should.be.Object;
        role.role.should.eql(1);
        done();
      });
    });
  });

  describe('has role 1 as string', function() {
    it('should return true', function (done) {
      sails.models.role.userHasRole(user, 1, function(err, found){
        found.should.be.true;
        done();
      });
    });
  });

  describe('has role 1 as object', function() {
    it('should return true', function (done) {
      sails.models.role.userHasRole(user, [1], function(err, found){
        found.should.be.true;
        done();
      });
    });
  });

  describe('has role 2', function() {
    it('should return false', function (done) {
      sails.models.role.userHasRole(user, 2, function(err, found){
        found.should.be.false;
        done();
      });
    });
  });

  describe('add role 2', function() {
    it('should return role', function (done) {
      sails.models.role.addToUser(user, 2, function(err, role){
        role.should.be.ok;
        role.should.be.Object;
        role.role.should.eql(2);
        done();
      });
    });
  });

  describe('has both role 1 and 2', function() {
    it('should return false', function (done) {
      sails.models.role.userHasRoles(user, [1], function(err, found){
        found.should.be.false;
        done();
      });
    });
    it('should return true', function (done) {
      sails.models.role.userHasRoles(user, [1,2], function(err, found){
        found.should.be.true;
        done();
      });
    });
  });

  describe('has both role 1 and 3', function() {
    it('should return false', function (done) {
      sails.models.role.userHasRoles(user, [1,3], function(err, found){
        found.should.be.false;
        done();
      });
    });
  });

  describe('remove role 1 and 2', function() {
    it('should return role', function (done) {
      sails.models.role.removeFromUser(user, 1, function(err, role){
        role.should.be.ok;
        role.should.be.Object;
        role.role.should.eql(1);
        sails.models.role.removeFromUser(user, 2, function(err, role){
          role.should.be.ok;
          role.should.be.Object;
          role.role.should.eql(2);
          done();
        });
      });
    });
  });

  describe('remove user', function() {
    it('should return success', function(done) {
      sails.models.user.destroy(user._id).exec(function(err){
        (err === null).should.be.true;
        done();
      });
    });
  });

});
