module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
    'bower:install',
		'clean:dev',
    'ngAnnotate:dev',
    'sass:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
