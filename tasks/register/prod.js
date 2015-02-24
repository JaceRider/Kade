module.exports = function (grunt) {
	// Moved into heroku.js
	grunt.registerTask('prod', [
		'compileAssets',
		'concat',
		'ngAnnotate:prod',
		'cssmin',
		'sails-linker:prodJs',
		'sails-linker:prodStyles',
		'sails-linker:devTpl',
		'sails-linker:prodJsJade',
		'sails-linker:prodStylesJade',
		'sails-linker:devTplJade'
	]);
};
