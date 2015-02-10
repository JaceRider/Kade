'use strict';

var _ = require('lodash');

/**
 * Used as a policy wrapper to check if current user is valid and has a given
 * role id.
 *
 * @param  {Integer} roleId The role id as defined in config/role
 * @return {Boolean}        True if has role. False if not.
 */
module.exports = {

  hasOne: function(roleIds) {
    var self = this;
    return function (req, res, next) {
      self._isAuthenticated(req, function(err, user) {
        if(err){
          return res.forbidden({err: err});
        }
        user.hasRole(roleIds, function(err, found) {
          if(!found){
            err = 'Access Denied';
          }
          if(err){
            return res.json(401, {err: err});
          }
          return next();
        });
      });
    }
  },

  hasAll: function(roleIds) {
    var self = this;
    return function (req, res, next) {
      self._isAuthenticated(req, function(err, user) {
        if(err){
          return res.forbidden({err: err});
        }
        user.hasRoles(roleIds, function(err, found) {
          if(!found){
            err = 'Access Denied';
          }
          if(err){
            return res.json(401, {err: err});
          }
          return next();
        });
      });
    }
  },

  /**
   * Validate token.
   *
   * @param  {Object} req  express request object
   * @return {Boolean}     True if user is found. False if not.
   */
  _isAuthenticated: function(req, cb) {
    sails.services.auth.validateTokenRequest(req, function(err, user){
      if(err){
        cb(err);
      }
      return cb(err, user);
    });
  }

};
