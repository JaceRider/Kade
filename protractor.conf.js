'use strict';

var Sails = require('sails'),
    q = require('q');

exports.config = {
  allScriptsTimeout: 30000,

  specs: [
    'test/e2e/**/*.test.js'
  ],

  capabilities: {
    'browserName': 'firefox'
  },

  baseUrl: 'http://localhost:1338/',

  framework: 'mocha',

  mochaOpts: {
    timeout: 30000
  },

  beforeLaunch: function() {
    var deferred = q.defer();
    Sails.lift({
      port: 1338,
      log: {
        level: 'error'
      },
      connections: {
        test: {
          adapter: 'sails-memory'
        }
      },
      models: {
        connection: 'test',
        migrate: 'drop'
      }
    }, function(err, sails) {
      deferred.resolve(sails);
    });
    return deferred.promise;
  },

  afterLaunch: function() {
    sails.lower();
  }
};
