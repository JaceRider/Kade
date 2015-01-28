'use strict';

var pipeline = require('./tasks/pipeline');

module.exports = function(config){

  config.set({

    basePath : './',

    frameworks: ['mocha', 'chai', 'sinon', 'chai-sinon'],

    files: pipeline.jsFilesToInject.concat([
      './bower_components/angular-mocks/angular-mocks.js',
      './test/client/lib/specHelper.js',

      './test/client/**/*.test.js'
    ]),

    reporters: ['progress', 'coverage'],

    preprocessors: {
      '.tmp/public/app/**/*.js': ['coverage']
    },

    coverageReporter: {
      type: 'lcov', // lcov or lcovonly are required for generating lcov.info files
      dir: 'coverage/'
    },

    autoWatch : true,

    browsers : ['Firefox'],

    port: 9876,

    proxies: {
      '/': 'http://localhost:1337/'
    },

    colors: true

  });
};
