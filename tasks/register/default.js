module.exports = function (grunt) {
	grunt.registerTask('default', [
    'compileAssets',
    'jshint:dev',
    'linkAssets',
    'watch'
  ]);
};
