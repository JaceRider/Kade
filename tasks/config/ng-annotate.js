/**
 * Annotate Angular files.
 *
 * ---------------------------------------------------------------
 *
 * ng-annotate adds and removes AngularJS dependency injection annotations. It
 * is non-intrusive so your source code stays exactly the same otherwise. No
 * lost comments or moved lines.
 *
 * For usage docs see:
 *    https://github.com/mzgol/grunt-ng-annotate
 */
module.exports = function(grunt) {

  grunt.config.set('ngAnnotate', {
    options: {
      singleQuotes: true,
    },
    prod: {
      files: {
        '.tmp/public/ng-annotate/production.js': ['.tmp/public/concat/production.js']
      }
    },
    dev: {
      files: [{
        expand: true,
        cwd: './app',
        src: ['**/*.js'],
        dest: '.tmp/public/app'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-ng-annotate');
};
