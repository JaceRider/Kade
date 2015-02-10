'use strict';

/* global User */

var _ = require('lodash');

/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,
  // migrate: 'drop',

  types: {
    is_role: function(roleId){
      var roles = sails.config.roles;
      return typeof roles[roleId] !== 'undefined';
    }
  },

  attributes: {
    user:{
      model: 'user'
    },
    role:{
      type: 'integer',
      is_role: true
    },

    toJSON: function() {
      var obj = this.toObject();
      return obj.role;
    },
  },

  /**
   * Adds a role to a user.
   *
   * @param  {Object|String}  user    The user object or user id.
   * @param  {String}         roleId  The role id.
   * @param  {Function}       cb      function to be called when the auth has been
   *                                  found or an error has occurred
   */
  addToUser: function(user, roleId, cb) {
    var self = this;

    if (typeof user === 'object') return create(null, user);
    User.findOne(user).exec(create);

    function create(err, user){
      if(err){
        sails.log.debug(__filename + ':' + __line + ' ' + err);
        return cb(err);
      }
      self.findOrCreate({user: user.id, role: roleId}, {user: user.id, role: roleId}).exec(function(err, role){
        if (err) {
          sails.log.debug(__filename + ':' + __line + ' ' + err);
          return cb(err);
        }
        sails.log.verbose(__filename + ':' + __line + ' Role ' + roleId + ' was added to user ' + user.id);
        return cb(err, role);
      });
    }
  },

  /**
   * Adds a role to a user.
   *
   * @param  {Object|String}  user    The user object or user id.
   * @param  {String}         roleId  The role id.
   * @param  {Function}       cb      function to be called when the auth has been
   *                                  found or an error has occurred
   */
  removeFromUser: function(user, roleId, cb) {
    var self = this;

    if (typeof user === 'object') return remove(null, user);
    User.findOne(user).exec(remove);

    function remove(err, user){
      if(err){
        sails.log.debug(__filename + ':' + __line + ' ' + err);
        return cb(err);
      }
      self.destroy({user: user.id, role: roleId}).exec(function(err, role){
        if (err) {
          sails.log.debug(__filename + ':' + __line + ' ' + err);
          return cb(err);
        }
        sails.log.verbose(__filename + ':' + __line + ' Role ' + roleId + ' was removed from user ' + user.id);
        return cb(err, role[0]);
      });
    }
  },

  /**
   * Check if a user has a role.
   *
   * @param  {Object|String}  user    The user object or user id.
   * @param  {Object|String}  roleIds The role id or ids.
   * @param  {Function}       cb      function to be called when the role has been
   *                                  found or an error has occurred
   */
  userHasRole: function(user, roleIds, cb) {
    var self = this;

    if (typeof user === 'object') user = user.id;

    if(typeof roleIds !== 'object') roleIds = [roleIds];

    User.findOne(user).populate('roles').exec(has);

    function has(err, user){
      if (user.roles && typeof user.roles === 'object'){
        var hasRole = function(element, index){
          return roleIds.indexOf(element.role) > -1;
        };
        cb(err, user.roles.some(hasRole));
      }
      else{
        return cb('User does not have role');
      }
    }
  },

  /**
   * Check if a user has a role.
   *
   * @param  {Object|String}  user    The user object or user id.
   * @param  {Object|String}  roleIds The role id or ids.
   * @param  {Function}       cb      function to be called when the role has been
   *                                  found or an error has occurred
   */
  userHasRoles: function(user, roleIds, cb) {
    var self = this;

    if (typeof user === 'object') user = user.id;

    if(typeof roleIds !== 'object') roleIds = [roleIds];

    User.findOne(user).populate('roles').exec(has);

    function has(err, user){
      if (user.roles && typeof user.roles === 'object'){
        if(user.roles.length !== roleIds.length){
          return cb('User does not have all roles', false);
        }
        var hasRole = function(element, index){
          return roleIds.indexOf(element.role) > -1;
        };
        cb(err, user.roles.every(hasRole));
      }
      else{
        return cb('User does not have all roles', false);
      }
    }
  }

};

