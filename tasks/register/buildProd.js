module.exports = function (grunt) {
	grunt.registerTask('buildProd', [
		'compileAssets',
		'concat',
		'ngAnnotate:prod',
		'uglify',
		'cssmin',
		'linkAssetsBuildProd',
		'clean:build',
		'copy:build'
	]);
};
