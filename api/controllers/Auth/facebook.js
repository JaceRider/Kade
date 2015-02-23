'use strict';

module.exports = {

  facebook: function(req, res) {
    var auth = sails.services.auth;
    var fb = auth.getFacebook;
    auth.getSelf(req, function(err, user){
      if(user){
        req.session.user = user;
      }
      res.redirect(auth.getFacebook.getLoginDialogURI());
    });
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
          facebookScreenName: _data.username,
          facebookName: _data.name
        };
        if(req.session.user){
          attr.user = req.session.user.id;
          if(typeof req.session.user.email === 'undefined'){
            attr.email = _data.email;
          }
          auth.attachAuthToUser(attr, req.session.user, userFound);
        }else{
          attr.email = _data.email;
          auth.findOrCreateAuth({facebookId: attr.facebookId}, attr, userFound);
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
      // Redirect to Angular route. We pass token so that it can be stored on
      // the client.
      sails.log.verbose(__filename + ':' + __line + ' Redirecting to ' + '/user/facebook/oauth');
      auth.loginSuccess(req, res, user, '/user/facebook/oauth');
    }
  }

};
