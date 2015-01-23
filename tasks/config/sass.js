module.exports = function(grunt) {

    grunt.config.set('sass', {
        options: {
            outputStyle: 'compressed',
            sourceMap: true,
            // includePaths: require('node-bourbon').with('other/path', 'another/path')
            // - or -
            includePaths: require('node-bourbon').includePaths
        },
        dev: {
            files: {
                '.tmp/public/styles/app.css': 'assets/styles/importer.scss'
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
};
