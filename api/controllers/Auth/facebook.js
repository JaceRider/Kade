'use strict';

module.exports = {

  facebook: function(req, res) {
    var auth = sails.services.auth;
    var fb = auth.getFacebook;
    res.redirect(auth.getFacebook.getLoginDialogURI());
  },

  facebook_oauth: function(req, res) {
    var auth = sails.services.auth;
    var fb = auth.getFacebook;
    fb.confirmIdentity(req.query.code, accessTokenResponse);

    /**
     * [accessTokenResponse description]
     * @param  {[type]} err                  [description]
     * @param  {[type]} accessToken       [description]
     */
    function accessTokenResponse(err, accessToken){
      if (err && typeof accessToken !== 'undefined') {
        sails.log.verbose(__filename + ':' + __line + ' ' + err);
        res.serverError();
      } else {
        fb.getMe(userInfoResponse);
      }
    }

    /**
     * [userInfoResponse description]
     * @param  {[type]} err    [description]
     * @param  {[type]} data     [description]
     * @param  {[type]} response [description]
     * @return {[type]}          [description]
     */
    function userInfoResponse(err, response, body){
      if (err) {
        sails.log.verbose(__filename + ':' + __line + ' ' + err);
        res.serverError();
      } else {
        var _data = JSON.parse(body);
        if(_data.err){
          sails.log.verbose(__filename + ':' + __line + ' ' + err);
          res.serverError(_data.err);
        }
        var attr = {
          facebookId: _data.id,
          name: _data.name
        };
        if(req.session.authenticated){
          attr.user = req.session.user.id;
          auth.attachAuthToUser(attr, req.session.user, userFound);
        }else{
          auth.findOrCreateAuth({twitterId: attr.twitterId}, attr, userFound);
        }
      }
    }

    /**
     * [userFound description]
     * @param  {[type]} err  [description]
     * @param  {[type]} user [description]
     * @return {[type]}      [description]
     */
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
      res.redirect('/user/facebook/oauth?token=' + user.token);
    }
  }

};
