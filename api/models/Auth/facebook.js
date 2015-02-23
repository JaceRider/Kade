'use strict';

module.exports = {
  attributes: {
    facebookId: {
      type: 'integer',
      unique: true
    },
    facebookScreenName: {
      type: 'string'
    },
    facebookName:{
      type: 'string'
    }
  }
};
