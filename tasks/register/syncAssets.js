module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		// 'jst:dev',
    'ngAnnotate:dev',
		// 'less:dev',
    'sass:dev',
		'sync:dev',
		'coffee:dev'
	]);
};
