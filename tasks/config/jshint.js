/**
 * JSHint
 */
module.exports = function(grunt) {

  grunt.config.set('jshint', {
    dev: {
      options: {
        jshintrc: true
      },
      files: {
        src: [
          'api/**/*.js'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
};
