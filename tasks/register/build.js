module.exports = function (grunt) {
  grunt.registerTask('build', [
    'compileAssets',
    'jshint:dev',
    'linkAssetsBuild',
    'clean:build',
    'copy:build'
  ]);
};
