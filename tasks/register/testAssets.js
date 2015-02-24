module.exports = function (grunt) {
	grunt.registerTask('testAssets', [
		'task:install',
		'clean:dev',
    'ngAnnotate:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
