'use strict';

module.exports = {
  attributes: {
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
  }
};
