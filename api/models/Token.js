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
    token: 'string',
    uses: {
      collection: 'tokenuse',
      via: 'token'
    },
    owner: {
      model: 'user'
    },
    revoked: {
      type: 'boolean',
      defaultsTo: false
    }
  }

};

