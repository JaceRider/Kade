'use strict';

/* global Attempt, Token, Auth, User, TokenUse */

var _ = require('lodash');

var config = sails.config.auth;

/**
 * Get config.
 */
exports.getConfig = function(){
  return config;
};

/**
 * Get config.
 */
exports.getConfig = function(){
  return sails.config.auth;
};

/**
 * handles successful logins
 *
 * @param  {Object} req  express request object
 * @param  {Object} res  expresss response object
 * @param  {Object} user the user instance
 * @api public
 */
exports.loginSuccess = function(req, res, user){
  sails.log.verbose(__filename + ':' + __line + ' [User login success]');

  var config = this.getConfig();

  if(!user){
    sails.log.verbose(__filename + ':' + __line + ' [loginSuccess requires a valid user object]');
    return res.serverError();
  }

  var address = this._addressFromRequest(req);

  var attempt = {
    user:user.id,
    successful: true
  };

  _.merge(attempt, address);

  Attempt.create(attempt).exec(function(err){
    if(err){
      sails.log.debug(__filename + ':' + __line + ' ' + err);
    }
  });

  this.loginToken(req, res, user);

  if(!config.jsonWebTokens.stateless){
    req.session.user = user;
    req.session.authenticated = true;
  }
  else{
    delete(req.session);
  }

  res.ok(user);
};

/**
 * handles token creation
 *
 * @param  {Object} req  express request object
 * @param  {Object} res  expresss response object
 * @param  {Object} user the user instance
 * @api public
 */
exports.loginToken = function(req, res, user){
  var moment = require('moment');
  var uuid = require('node-uuid');
  var jwt = require('jwt-simple');
  var config = this.getConfig();
  var jsonWebTokens = config.jsonWebTokens || {};

  var expiryUnit = (jsonWebTokens.expiry && jsonWebTokens.expiry.unit) || 'days';
  var expiryLength = (jsonWebTokens.expiry && jsonWebTokens.expiry.length) || 7;
  var expires = moment().add(expiryLength, expiryUnit).valueOf();
  var issued = Date.now();

  user.token = jwt.encode({
    iss: user.id + '|' + req.remoteAddress,
    sub: jsonWebTokens.subject,
    aud: jsonWebTokens.audience,
    exp: expires,
    nbf: issued,
    iat: issued,
    jti: uuid.v1()
  }, jsonWebTokens.secret);

  Token.create({token: user.token, uses: 0, owner: user.id}).exec(function(err){
    if(err){
      return res.serverError('JSON web token could not be created');
    }

    res.json({
      token : user.token,
      expires: expires
    });
  });
};

/**
 * handles login failures
 *
 * @param  {Object} req  express request object
 * @param  {Object} res  expresss response object
 * @param  {Object} user the user instance
 * @param  {Object|String} error the error that caused the failure
 * @api public
 */
exports.loginFailure = function(req, res, user, error){
  sails.log.verbose(__filename + ':' + __line + ' [User login failure]');

  var config = this.getConfig();

  if(user){
    var address = this._addressFromRequest(req);

    var attempt = {
      user:user.id,
      successful: false
    };

    _.merge(attempt, address);

    Attempt.create(attempt).exec(function(err){
      if(err){
        sails.log.debug(__filename + ':' + __line + ' ' + err);
      }
    });
  }

  if(!config.jsonWebTokens.stateless){
    if(req.session.authenticated){
      req.session.authenticated = false;
    }

    delete(req.session.user);
  }

  res.forbidden(error);
};

/**
 * Get user auth object.
 * @param  {Object}   attributes          auth attributes
 * @param  {Boolean}  createOnNotFound    if true will create a user if not found
 * @param  {Function} cb                  function to be called when the auth has been
 *                                        found or an error has occurred
 */
exports.getUserAuthObject = function(attributes, createOnNotFound, cb){
  sails.log.verbose(__filename + ':' + __line + ' [User get auth object]');

  var attr = {
    password: attributes.password,
    email: attributes.email,
    username: attributes.username
  };
  var criteria = {};
  criteria.email = attributes.email;

  if(createOnNotFound === true){
    this.findOrCreateAuth(criteria, attr, cb);
  }
  else{
    this.findAuth(criteria, cb);
  }
};

/**
 * Get current user by token.
 */
exports.getSelf = function(req, cb){
  this.validateTokenRequest(req, function(err, user){
    cb(err, user);
  });
};

/**
* Simple wrapper for Auth find/populate method
*
* @param {Object} criteria should be id to find the auth by
* @param {Function} cb function to be called when the auth has been
* found or an error has occurred
* @api public
*/
exports.findAuth = function(criteria, cb){
  var self = this;
  Auth.findOne(criteria)
  .exec(function(err, auth){
    User.findOne(auth.user).populate('auth').populate('roles').exec(function(err, user){
      cb(err, user);
    });
    // cb(err, self._invertAuth(auth));
  });
};

/**
 * Find or create the auth then pass the results to _attachAuthToUser
 *
 * @param  {Object}   criteria   should be id to find the auth by
 * @param  {Object}   attributes auth attributes
 * @param  {Function} cb         function to be called when the auth has been
 *                               found or an error has occurred
 *
 * @api public
 */
exports.findOrCreateAuth = function(criteria, attributes, cb){
  var self = this;
  Auth.findOrCreate(criteria, attributes)
  .exec(function(err, newAuth){
    if(err){
      sails.log.debug(__filename + ':' + __line + ' ' + err);
      return cb(err);
    }

    Auth.findOne(newAuth.id).populate('user')
    .exec(function(err, auth){
      if(err){
        sails.log.debug(__filename + ':' + __line + ' ' + err);
        return cb(err);
      }

      self._attachAuthToUser(auth, cb);
    });
  });
};

/**
* Attach given auth attributes to user
*
* @param {Object} attributes auth attributes
* @param {Object} user user instance
* @param {Function} cb function to be called when the auth has been
* attached or an error has occurred
* @api public
*/
exports.attachAuthToUser = function(attributes, user, cb){
  var self = this;
  attributes.user = user.id;

  User.findOne(user.id).exec(function(err, user){
    if(err){
      sails.log.debug(__filename + ':' + __line + ' ' + err);
      return cb(err);
    }

    if(user.auth){
      delete(attributes.auth);
      //update existing auth
      Auth.findOne(user.auth).exec(function(err, auth){
        if(err){
          sails.log.debug(__filename + ':' + __line + ' ' + err);
          return cb(err);
        }

        // Check if any attribtues have changed if so update them
        if(self._updateAuth(auth, attributes)){
           auth.save(function(err){
            if(err){
              sails.log.debug(__filename + ':' + __line + ' ' + err);
              return cb(err);
            }
            user.auth = auth;
            cb(err, user);
          });
        }else{
          user.auth = auth;
          cb(err, user);
        }

      });
    }else{
      // force create by pass of user id
      self.findOrCreateAuth(user.id, attributes, cb);
    }
  });
};

/**
 * handles token creation
 *
 * @param  {Object} req  express request object
 * @param  {Object} res  expresss response object
 * @param  {Object} user the user instance
 * @api public
 */
exports.loginToken = function(req, res, user){
  var moment = require('moment');
  var uuid = require('node-uuid');
  var jwt = require('jwt-simple');
  var path = require('path');
  var config = this.getConfig();
  var jsonWebTokens = config.jsonWebTokens || {};

  var expiryUnit = (jsonWebTokens.expiry && jsonWebTokens.expiry.unit) || 'days';
  var expiryLength = (jsonWebTokens.expiry && jsonWebTokens.expiry.length) || 7;
  var expires = moment().add(expiryLength, expiryUnit).valueOf();
  var issued = Date.now();

  user.token = jwt.encode({
    iss: user.id + '|' + req.remoteAddress,
    sub: jsonWebTokens.subject,
    aud: jsonWebTokens.audience,
    exp: expires,
    nbf: issued,
    iat: issued,
    jti: uuid.v1()
  }, jsonWebTokens.secret);

  Token.create({token: user.token, uses: 0, owner: user.id}).exec(function(err){
    if(err){
      return res.serverError('JSON web token could not be created');
    }

    res.json({
      token : user.token,
      expires: expires
    });
  });
};

/**
 * Validates a token from an Express request object
 *
 * @param  {Express request}   req the Express request object
 * @param  {Function} cb  Callback when to be called when token
 *                        has been validated or an error has occured
 */
exports.validateTokenRequest = function(req, cb){
  var self = this;
  var token = this.allParams(req).access_token;

  if(token){
    var config = this.getConfig();

    // validate the token
    this.validateToken(token, function(err, user){
      if(err){
        sails.log.debug(__filename + ':' + __line + ' ' + err);
        return cb(err);
      }

      // check if we're running in stateless
      if(!config.jsonWebTokens.stateless){
        self.bindToSession(req, user);
      }

      // check if we're tracking usage
      if(config.jsonWebTokens.trackUsage){
        var address = self._addressFromRequest(req);
        return self.trackTokenUsage(address, token, user, cb);
      }

      sails.log.verbose(__filename + ':' + __line + ' access token accepted');
      cb(null, user);
    });
  }else{
    sails.log.verbose(__filename + ':' + __line + ' no access token present');
    cb('Access token not present.');
  }
};

/**
 * Validates a token
 *
 * @param  {String}   token the token to be validated
 * @param  {Function} cb    called when error has occured or token is validated
 */
exports.validateToken = function(token, cb){
  try{
    var jwt = require('jwt-simple');
    var config = this.getConfig();
    // decode the token
    var _token = jwt.decode(token, config.jsonWebTokens.secret);

    // set the time of the request
    var _reqTime = Date.now();

    // If token is expired
    if(_token.exp <= _reqTime){
      sails.log.debug(__filename + ':' + __line + ' access token rejected, reason: EXPIRE');
      return cb('Your token is expired.');
    }

    // If token is early
    if(_reqTime <= _token.nbf){
      sails.log.debug(__filename + ':' + __line + ' access token rejected, reason: TOKEN EARLY');
      return cb('This token is early.');
    }

    // If audience doesn't match
    if(config.jsonWebTokens.audience !== _token.aud){
      sails.log.debug(__filename + ':' + __line + ' access token rejected, reason: AUDIENCE');
      return cb('This token cannot be accepted for this domain.');
    }

    this.findUserFromToken(_token, cb);

  } catch(err){
    cb(err);
  }
};

/**
 * Find the user the give token is issued to
 *
 * @param  {Object}   token The parsed token
 * @param  {Function} cb    Callback to be called when a user is
 *                          found or an error has occured
 */
exports.findUserFromToken = function(token, cb){
  // deserialize the token iss
  var _iss = token.iss.split('|');

  User.findOne(_iss[0]).populate('auth').populate('roles').exec(function(err, user){
    if(err){
      sails.log.debug(__filename + ':' + __line + ' ' + err);
    }

    cb(err, user);
  });
};

/**
 * Tracks the tokens usage and invokes the user defined callback
 *
 * @param  {Object}   address the transport address
 * @param  {String}   token   the raw token
 * @param  {Waterline DAO}   user    the user object
 * @param  {Function} cb      Callback to be invoked when an error has occured
 *                            or the token has been tracked successfully
 */
exports.trackTokenUsage = function(address, token, user, cb){
  this.findAndTrackJWT(token, address, function(err){
    if(err){
      sails.log.verbose(__filename + ':' + __line + ' ' + err);
      return cb(err);
    }
    cb(null, user);
  });
};

/**
 * Finds the DAO instance of the give token and tracks the usage
 *
 * @param  {String}   token   the raw token
 * @param  {Object}   address the transport address
 * @param  {Function} cb      Callback to be invoked when an error has
 *                            occured or the token was tracked successfully
 */
exports.findAndTrackJWT = function(token, address, cb){
  Token.findOne({token: token}, function(err, j){
    if(err){
      return cb(err);
    }

    if(!j){
      sails.log.verbose(__filename + ':' + __line + ' access token not found');
      return cb('Token not found');
    }

    if(j.revoked){
      sails.log.debug(__filename + ':' + __line + ' access token rejected, reason: REVOKED');
      return cb('This token has been revoked');
    }

    var use = {token: j.id, remoteAddress: address.ip};
    TokenUse.create(use).exec(function(){});

    cb(null);
  });
};

/**
 * Attaches a user object to the Express req session
 *
 * @param  {Express request} req  the Express request object
 * @param  {Waterline DAO} user the waterline user object
 */
exports.bindToSession = function(req, user){
  req.session.authenticated = true;
  req.session.user = user;
};

/**
 * This will create a user and auth object if one is not found
 *
 * @param  {Object}   criteria   should be id to find the auth by
 * @param  {Object}   attributes auth attributes
 * @param  {Function} cb         function to be called when the auth has been
 *                               found or an error has occurred
 * @api private
 */
exports._attachAuthToUser = function(auth, cb){
  var self = this;

  // create the user
  if(!auth.user){
    User.create({auth:auth.id}).populate('roles').exec(function(err, user){
      if(err){
        sails.log.debug(__filename + ':' + __line + ' ' + err);
        return cb(err);
      }

      // update the auth object
      Auth.update(auth.id, {user:user.id}).exec(function(err, auth){
        if(err){
          sails.log.debug(__filename + ':' + __line + ' ' + err);
          return cb(err);
        }

        user.auth = auth.shift();
        cb(err, user);
      });
    });
  }else{
    // just fire off update to user object so we can get the
    // backwards association going.
    if(!auth.user.auth){
      User.update(auth.user.id, {auth:auth.id}).exec(function(){});
    }

    User.findOne(auth.user.id).populate('auth').populate('roles').exec(function(err, user){
      cb(err, user);
    });
    // cb(null, self._invertAuth(auth));
  }
};

/**
 * Inverts the auth object so we don't need to run another query
 *
 * @param  {Object} auth Auth object
 * @return {Object}      User object
 * @api private
 */
// exports._invertAuth = function(auth){
//   // nothing to invert
//   if(!auth || !auth.user){
//     return auth;
//   }

//   var u = auth.user;
//   delete(auth.user);
//   u.auth = auth;
//   return u;
// };

/**
* Decorates the auth object with values of the attributes object
* where the attributes differ from the auth
*
* @param {Object} auth waterline Auth instance
* @param {Object} attributes used to update auth with
* @return {Boolean} true if any values were updated
*/
exports._updateAuth = function(auth, attributes){
  var changed = false;
  for(var key in attributes){
    if(attributes.hasOwnProperty(key)){
      if(auth[key] !== attributes[key]){
        auth[key] = attributes[key];
        changed = true;
      }
    }
  }
  return changed;
};

/**
 * returns an ip address and port from the express request object, or the
 * sails.io socket which is attached to the req object.
 *
 * @param  {Object} req express request
 * @return {Object}   the transport address object
 * @api private
 */
exports._addressFromRequest = function(req){
  if(req.connection && req.connection.remoteAddress){
  return {
    ip:req.connection.remoteAddress,
    port: req.connection.remotePort
  };
  }

  if(req.socket && req.socket.remoteAddress){
  return {
    ip: req.socket.remoteAddress,
    port: req.socket.remotePort
  };
  }

  return{
  ip: '0.0.0.0',
  port: 'n/a'
  };
};

/**
* gathers all params for this request
*
* @param {Object} req the express request object
* @return {Object} all params
* @api public
*/
exports.allParams = function(req){
  var params = req.params.all();
  _.merge(params, req.headers);
  return _.merge(params, req.query);
};

/**
 * Load additional optional services
 */
var services = require('include-all')({
  dirname     :  __dirname +'/Auth',
  filter      :  /(.+)\.js$/,
  excludeDirs :  /^\.(git|svn)$/
});

_.forEach(services, function(service, key){
  if(typeof config.authMethod[key].enabled !== 'undefined' &&
    config.authMethod[key].enabled === 1){
    _.merge(exports, services[key]);
  }
});
