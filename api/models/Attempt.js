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
    user:{
      model: 'user'
    },
    successful:{
      type: 'boolean',
      defaultsTo: false
    },
    ip:{
      type: 'string'
    },
    port:{
      type: 'string'
    }
  }

};

