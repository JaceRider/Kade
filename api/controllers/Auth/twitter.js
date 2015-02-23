'use strict';

module.exports = {

  twitter: function(req, res) {
    var auth = sails.services.auth;
    var config = auth.getConfig();
    auth.getSelf(req, function(err, user){
      if(user){
        req.session.user = user;
      }
      auth.getTwitterOauth().getOAuthRequestToken(oauthResponse);
    });

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
        req.session.oauthRequestToken = oauthToken;
        req.session.oauthRequestTokenSecret = oauthTokenSecret;
        res.redirect(auth.getTwitter().authenticate+'?oauth_token='+req.session.oauthRequestToken);
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
      delete req.session.oauthRequestToken;
      delete req.session.oauthRequestTokenSecret;
      delete req.session.oauthAccessToken;
      delete req.session.oauthAccessTokenSecret;
      if (err) {
        sails.log.verbose(__filename + ':' + __line + ' ' + err);
        res.serverError();
      } else {
        var _data = JSON.parse(data);
        var attr = {
          twitterId: _data.id,
          twitterScreenName: _data.screen_name,
          twitterName: _data.name
        };
        if(req.session.user){
          attr.user = req.session.user.id;
          auth.attachAuthToUser(attr, req.session.user, userFound);
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
      // Redirect to Angular route. We pass token so that it can be stored on
      // the client.
      sails.log.verbose(__filename + ':' + __line + ' Redirecting to ' + '/user/twitter/oauth');
      auth.loginSuccess(req, res, user, '/user/twitter/oauth');
    }

  }

};
