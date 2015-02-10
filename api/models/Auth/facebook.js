'use strict';

module.exports = {
  attributes: {
    facebookId: {
      type: 'integer',
      unique: true
    },
    name:{
      type: 'string'
    }
  }
};
