'use strict';

var bcrypt = require('bcrypt');

/**
 * UserController
 *
 * @description :: Server-side logic for managing users and auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  secure: function(req, res) {
    return res.json({message:'Be who you are and say what you feel, because those who mind don’t matter and those who matter don’t mind.'});
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
  },

  twitter: function(req, res) {
    var auth = sails.services.auth;
    var config = auth.getConfig();
    if(typeof config.authMethod.twitter !== 'undefined'){
      auth.getTwitterOauth().getOAuthRequestToken(oauthResponse);
    }
    else{
      res.badRequest();
    }

    /**
     *
     * @param {[type]} err [description]
     * @param {[type]} oauthToken [description]
     * @param {[type]} oauthTokenSecret [description]
     * @param {[type]} results [description]
     * @return {[type]} [description]
     */
    function oauthResponse(err, oauthToken, oauthTokenSecret){
      if (err) {
        sails.log.verbose(__filename + ':' + __line + ' ' + err);
        res.badRequest();
      } else {
        auth.getSelf(req, function(err, user){
          if(user){
            req.session.authenticated = true;
            req.session.user = user;
          }
          req.session.oauthRequestToken = oauthToken;
          req.session.oauthRequestTokenSecret = oauthTokenSecret;
          res.redirect(auth.getTwitter().authenticate+'?oauth_token='+req.session.oauthRequestToken);
        });
      }
    }

  },

  twitter_oauth: function(req, res) {
    var auth = sails.services.auth;
    var config = auth.getConfig();
    if(typeof config.authMethod.twitter !== 'undefined'){
      var oauth = auth.getTwitterOauth();
      oauth.getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier, accessTokenResponse);
    }
    else{
      res.badRequest();
    }

    /**
     * [accessTokenResponse description]
     * @param {[type]} err [description]
     * @param {[type]} oauthAccessToken [description]
     * @param {[type]} oauthAccessTokenSecret [description]
     * @param {[type]} results [description]
     * @return {[type]} [description]
     */
    function accessTokenResponse(err, oauthAccessToken, oauthAccessTokenSecret, results){
      if (err) {
        sails.log.verbose(__filename + ':' + __line + ' ' + err);
        res.serverError();
      } else {
        req.session.oauthAccessToken = oauthAccessToken;
        req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
        oauth.get(auth.getTwitter().userProfile+'?user_id='+results.user_id,
        req.session.oauthAccessToken,
        req.session.oauthAccessTokenSecret, userInfoResponse);
      }
    }

    /**
    * [userInfoResponse description]
    * @param {[type]} err [description]
    * @param {[type]} data [description]
    * @param {[type]} response [description]
    * @return {[type]} [description]
    */
    function userInfoResponse(err, data){
      if (err) {
        sails.log.verbose(__filename + ':' + __line + ' ' + err);
        res.serverError();
      } else {
        var _data = JSON.parse(data);
        var attr = {
          twitterId: _data.id,
          screenName: _data.screen_name,
          name: _data.name
        };
        if(req.session.user){
          attr.user = req.session.user.id;
          auth.attachAuthToUser(attr, req.session.user, userFound);
          delete(req.session.user);
        }else{
          auth.findOrCreateAuth({twitterId: attr.twitterId}, attr, userFound);
        }
      }
    }

    function userFound(err, user){
      if(err){
        // ensure your using username instead of email
        sails.log.verbose(__filename + ':' + __line + ' ' + err);
        auth.loginFailure(req, res, null, {err: 'Trouble creating user.'});
      }
      auth.loginSuccess(req, res, user);
      // Redirect to Angular route. We pass token so that it can be stored on
      // the client.
      sails.log.verbose(__filename + ':' + __line + ' Redirecting to ' + '/user/twitter/oauth?token=' + user.token);
      res.redirect('/user/twitter/oauth?token=' + user.token);
    }

  }

};
