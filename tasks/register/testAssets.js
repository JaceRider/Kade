module.exports = function (grunt) {
	grunt.registerTask('testAssets', [
		'bower:install',
		'clean:dev',
    'ngAnnotate:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
