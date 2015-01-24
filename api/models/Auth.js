/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,
  // migrate: 'drop',

  attributes: attributesGet(),

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

function attributesGet(){
  var _ = require('lodash');
  var config = sails.config.auth;

  var attributes = {
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

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  };

  if(typeof config.authMethod.twitter !== 'undefined'){
    attributes = _.merge({
      twitterId: {
        type: 'integer',
        unique: true
      },
      screenName: {
        type: 'string'
      },
      name:{
        type: 'string'
      }
    }, attributes);
  }

  return attributes;
}
