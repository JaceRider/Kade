'use strict';

var _ = require('lodash');

/**
* Auth.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {
    user:{
      model: 'user'
    },
    email: {
      type: 'email',
      unique: true
    },
    password: {
      type: 'string'
    },

    // Instance methods
    getName: function(){
      var obj = this.toObject();
      var name = 'Anonymous';
      if(typeof obj.twitterName !== 'undefined'){
        name = obj.twitterName;
      }
      if(typeof obj.facebookName !== 'undefined'){
        name = obj.facebookName;
      }
      return name;
    },

    // Instance methods
    getScreenName: function(){
      var obj = this.toObject();
      var name = obj.email;
      if(typeof obj.twitterScreenName !== 'undefined'){
        name = obj.twitterScreenName;
      }
      if(typeof obj.facebookScreenName !== 'undefined'){
        name = obj.facebookScreenName;
      }
      return name;
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.createdAt;
      delete obj.updatedAt;
      obj.name = this.getName();
      obj.screenName = this.getScreenName();
      return obj;
    }
  },

  beforeCreate: function(values, cb) {
    if(typeof values.password !== 'undefined'){
      var bcrypt = require('bcrypt');
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(values.password, salt);
      values.password = hash;
    }
    cb();
  },

  beforeUpdate: function(values, cb) {
    if(typeof values.password !== 'undefined'){
      var bcrypt = require('bcrypt');
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(values.password, salt);
      values.password = hash;
    }
    cb();
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
