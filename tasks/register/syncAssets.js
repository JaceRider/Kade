module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
    'ngAnnotate:dev',
    'sass:dev',
		'sync:dev',
		'coffee:dev'
	]);
};
