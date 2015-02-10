'use strict';

/**
 * Get twitter info.
 */
exports.getTwitter = function(){
  return {
    requestToken : 'https://api.twitter.com/oauth/request_token',
    accessToken  : 'https://api.twitter.com/oauth/access_token',
    userProfile  : 'https://api.twitter.com/1.1/users/show.json',
    authenticate : 'https://api.twitter.com/oauth/authenticate',
    callbackUri  : '/api/auth/twitter_oauth'
  };
};

/**
 * Get twitter info.
 */
exports.getTwitterOauth = function(){
  var OAuth   = require('oauth').OAuth;
  var config = this.getConfig();
  var twitter = this.getTwitter();
  var method  = config.authMethod.twitter;
  return new OAuth(twitter.requestToken, twitter.accessToken, method.consumerKey, method.consumerSecret, '1.0A', config.baseUrl+twitter.callbackUri, 'HMAC-SHA1');
};
