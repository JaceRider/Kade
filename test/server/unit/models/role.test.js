'use strict';

var request = require('supertest');

describe('RoleModel', function(){
  var AuthModel;
  var user;

  describe('create user', function() {
    it('should return success', function (done) {
      sails.services.auth.getUserAuthObject({email:'email@site.com',password:'2600'}, true, function(err, _user){
        User.should.be.Object;
        user = _user;
        done();
      });
    });
  });

  describe('add role 1', function() {
    it('should return role', function (done) {
      Role.addToUser(user, 1, function(err, role){
        role.should.be.ok;
        role.should.be.Object;
        role.role.should.eql(1);
        done();
      });
    });
  });

  describe('has role 1 as string', function() {
    it('should return true', function (done) {
      Role.userHasRole(user, 1, function(err, found){
        found.should.be.true;
        done();
      });
    });
  });

  describe('has role 1 as object', function() {
    it('should return true', function (done) {
      Role.userHasRole(user, [1], function(err, found){
        found.should.be.true;
        done();
      });
    });
  });

  describe('has role 2', function() {
    it('should return false', function (done) {
      Role.userHasRole(user, 2, function(err, found){
        found.should.be.false;
        done();
      });
    });
  });

  describe('add role 2', function() {
    it('should return role', function (done) {
      Role.addToUser(user, 2, function(err, role){
        role.should.be.ok;
        role.should.be.Object;
        role.role.should.eql(2);
        done();
      });
    });
  });

  describe('has both role 1 and 2', function() {
    it('should return false', function (done) {
      Role.userHasRoles(user, [1], function(err, found){
        found.should.be.false;
        done();
      });
    });
    it('should return true', function (done) {
      Role.userHasRoles(user, [1,2], function(err, found){
        found.should.be.true;
        done();
      });
    });
  });

  describe('has both role 1 and 3', function() {
    it('should return false', function (done) {
      Role.userHasRoles(user, [1,3], function(err, found){
        found.should.be.false;
        done();
      });
    });
  });

  describe('remove role 1 and 2', function() {
    it('should return role', function (done) {
      Role.removeFromUser(user, 1, function(err, role){
        role.should.be.ok;
        role.should.be.Object;
        role.role.should.eql(1);
        Role.removeFromUser(user, 2, function(err, role){
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
      User.destroy(user._id).exec(function(err){
        (err === null).should.be.true;
        done();
      });
    });
  });

});
