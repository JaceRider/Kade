'use strict';

var _ = require('lodash');
var bcrypt = require('bcrypt');

/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  secure: function(req, res) {
    return res.json({message:'Be who you are and say what you feel, because those who mind don’t matter and those who matter don’t mind.'});
  },

  admin: function(req, res) {
    return res.json({message:'The best time to plant a tree was 20 years ago. The second best time is now.'});
  },

  signup: function(req, res) {

    var auth = sails.services.auth;
    var params = req.params.all();

    if(typeof params.email === 'undefined'){
      auth.loginFailure(req, res, null, {type: 'email', err: 'Email address is required.'});
    }
    else if(typeof params.password === 'undefined'){
      auth.loginFailure(req, res, null, {type: 'password', err: 'Password is required.'});
    }
    else if(typeof params.passwordConfirm !== 'undefined' && params.password !== params.passwordConfirm){
      auth.loginFailure(req, res, null, {type: 'passwordConfirm', err: 'Password does not match the confirm password.'});
    }
    else{
      var pass = params.password;
      auth.getUserAuthObject(params, true, function(err, user){
        if (err) {
          res.serverError(err);
        }

        if (user) {
          if(bcrypt.compareSync(pass, user.auth.password)){
            auth.loginSuccess(req, res, user);
          }
          else{
            auth.loginFailure(req, res, user, {err: 'Signup failure.'});
          }
        }
        else{
          auth.loginFailure(req, res, null, {err: 'User not found.'});
        }

      });
    }
  },

  login: function(req, res) {

    var auth = sails.services.auth;
    var params = req.params.all();

    if(typeof params.email === 'undefined'){
      auth.loginFailure(req, res, null, {type: 'email', err: 'Email address is required.'});
    }
    else if(typeof params.password === 'undefined'){
      auth.loginFailure(req, res, null, {type: 'password', err: 'Password is required.'});
    }
    else{
      var pass = params.password;
      auth.getUserAuthObject(params, false, function(err, user){
        if (err) {
          res.serverError(err);
        }

        if (user) {
          if(bcrypt.compareSync(pass, user.auth.password)){
            auth.loginSuccess(req, res, user);
          }
          else{
            auth.loginFailure(req, res, user, {err: 'Login failure.'});
          }
        }
        else{
          auth.loginFailure(req, res, null, {err: 'User not found.'});
        }

      });
    }
  }

};

/**
 * Load additional optional services
 */
var config = sails.config.auth;
var services = require('include-all')({
  dirname     :  __dirname +'/Auth',
  filter      :  /(.+)\.js$/,
  excludeDirs :  /^\.(git|svn)$/
});

_.forEach(services, function(service, key){
  if(typeof config.authMethod[key].enabled !== 'undefined' &&
    config.authMethod[key].enabled === 1){
    _.merge(module.exports, services[key]);
  }
});
