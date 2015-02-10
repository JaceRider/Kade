/**
* Auth Config
*
* defines various options used by auth
*/

module.exports.auth = {

  // Base URL
  //
  // used by auth methods for callback URI's using oauth and for password
  // reset links.
  baseUrl: 'http://ashenrayne.dnsalias.com:1337',

  // Auth Method(s)
  //
  authMethod: {
    twitter: {
      name: 'Twitter',
      enabled: process.env.AUTH_TWITTER_ENABLED || 1,
      consumerKey: process.env.AUTH_TWITTER_KEY || '',
      consumerSecret: process.env.AUTH_TWITTER_SECRET || ''
    },
    facebook: {
      name: 'Facebook',
      enabled: process.env.AUTH_FACEBOOK_ENABLED || 1,
      appId: process.env.AUTH_FACEBOOK_ID || '',
      appSecret: process.env.AUTH_FACEBOOK_SECRET || ''
    }
  },

  // JSON Web Tokens
  //
  // this provides Kade with basic information to build your tokens,
  // these tokens are used for authentication, password reset,
  // and anything else you can imagine
  jsonWebTokens: {
    secret: 'change this secret',
    expiry:{
      unit: 'days',
      length: '7'
    },
    audience: 'my app',
    subject: 'subject',
    // tracks jwt usage if set to true
    trackUsage: true,
    // if set to false will authenticate the
    // express session object and attach the
    // user to it during the hasJsonWebToken
    // middleware
    stateless: false,
  },

};
