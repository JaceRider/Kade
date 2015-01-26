'use strict';

/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,
  // migrate: 'drop',

  attributes: {
    remoteAddress: {
      type: 'string'
    },
    token: {
      model: 'token'
    }
  }

};

