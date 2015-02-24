module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
    'ngAnnotate:dev',
    'sass:dev',
		'copy:dev',
		'coffee:dev',
		'jshint:dev'
	]);
};
