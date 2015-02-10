'use strict';

var request = require('supertest');

describe('AuthController', function(){
  var AuthController;
  var user;

  describe('signup', function() {
    it('should return success', function (done) {
      AuthController = require('../../../../api/controllers/AuthController');
      request(sails.hooks.http.app)
        .post('/api/auth/signup')
        .send({
          email: 'email@site.com',
          password: '2600'
        })
        .expect(200, done);
    });
  });

  describe('login', function() {
    it('should return success', function (done) {
      request(sails.hooks.http.app)
        .post('/api/auth/login')
        .send({
          email: 'email@site.com',
          password: '2600'
        })
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          user = res.body;
          done(err);
        });
    });
  });

  describe('list', function() {
    it('should return list', function (done) {
      request(sails.hooks.http.app)
        .get('/api/auth')
        .expect(200)
        .expect(hasResults)
        .end(done);
      function hasResults(res) {
        if (!res.body.length || res.body.length !== 1) return 'no results found';
      }
    });
  });

  describe('get', function(){
    it('should get user', function (done) {
      request(sails.hooks.http.app)
        .get('/api/auth/' + user.id)
        .expect(200)
        .expect(hasResults)
        .end(done);
      function hasResults(res) {
        if (!('id' in res.body)) return 'user was not returned';
      }
    });
  });

  describe('delete', function(){
    it('should delete user', function (done) {
      request(sails.hooks.http.app)
        .delete('/api/auth/' + user.id)
        .expect(200, done);
    });
  });

});
