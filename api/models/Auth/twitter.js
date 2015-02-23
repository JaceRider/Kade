'use strict';

module.exports = {
  attributes: {
    twitterId: {
      type: 'integer',
      unique: true
    },
    twitterScreenName: {
      type: 'string'
    },
    twitterName:{
      type: 'string'
    }
  }
};
