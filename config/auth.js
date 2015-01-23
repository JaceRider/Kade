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
    local: {
      name: 'Local'
    },
    // twitter: {
    //   name: 'Twitter',
    //   consumerKey: 'your-consumer-key',
    //   consumerSecret: 'your-consumer-secret'
    // }
  },

  // JSON Web Tokens
  //
  // this provides waterlock with basic information to build your tokens,
  // these tokens are used for authentication, password reset,
  // and anything else you can imagine
  jsonWebTokens: {
    // CHANGE THIS SECRET
    secret: 'boba takes out kast',
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
