/* global Role, User */

/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {
    attempts: {
      collection: 'attempt',
      via: 'user'
    },
    tokens: {
      collection: 'token',
      via: 'owner'
    },
    roles:{
      collection: 'role',
      via: 'user'
    },
    auth:{
      model: 'auth'
    },

    /**
     * Adds a role to a user.
     *
     * @param  {String}     roleId  The role id.
     * @param  {Function}   cb      function to be called when the role has been
     *                              found or an error has occurred
     */
    addRole: function(roleId, cb) {
      Role.addToUser(this, roleId, cb);
    },

    /**
     * Removes a role from a user.
     *
     * @param  {String}     roleId  The role id.
     * @param  {Function}   cb      function to be called when the role has been
     *                              found or an error has occurred
     */
    removeRole: function(roleId, cb) {
      Role.removeFromUser(this, roleId, cb);
    },

    /**
     * Checks if a user has a role.
     *
     * @param  {String}     roleId  The role id.
     * @param  {Function}   cb      function to be called when the role has been
     *                              found or an error has occurred
     */
    hasRole: function(roleId, cb) {
      Role.userHasRole(this, roleId, cb);
    },

    /**
     * To JSON.
     */
    toJSON: function() {
      var obj = this.toObject();
      delete obj.tokens;
      delete obj.attempts;
      return obj;
    }
  },


  /**
   * Adds a role to a user.
   *
   * @param  {Object|String}  user    The user object or user id.
   * @param  {String}         roleId  The role id.
   * @param  {Function}       cb      function to be called when the role has been
   *                                  found or an error has occurred
   */
  addRole: function(user, roleId, cb){
    if (typeof user === 'object') return create(null, user);
    User.findOne(user).exec(create);

    function create(err, user){
      if(err){
        sails.log.debug(__filename + ':' + __line + ' ' + err);
        return cb(err);
      }
      user.addRole(roleId, cb);
    }
  },

  /**
   * Remove a role from a user.
   *
   * @param  {Object|String}  user    The user object or user id.
   * @param  {String}         roleId  The role id.
   * @param  {Function}       cb      function to be called when the role has been
   *                                  found or an error has occurred
   */
  removeRole: function(user, roleId, cb){
    if (typeof user === 'object') return remove(null, user);
    User.findOne(user).exec(remove);

    function remove(err, user){
      if(err){
        sails.log.debug(__filename + ':' + __line + ' ' + err);
        return cb(err);
      }
      user.removeRole(roleId, cb);
    }
  },

  /**
   * Check if a user has a role.
   *
   * @param  {Object|String}  user    The user object or user id.
   * @param  {String}         roleId  The role id.
   * @param  {Function}       cb      function to be called when the role has been
   *                                  found or an error has occurred
   */
  hasRole: function(user, roleId, cb){
    if (typeof user === 'object') return has(null, user);
    User.findOne(user).exec(has);

    function has(err, user){
      if(err){
        sails.log.debug(__filename + ':' + __line + ' ' + err);
        return cb(err);
      }
      user.hasRole(roleId, cb);
    }
  }

};

