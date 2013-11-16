module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-cli');


    grunt.initConfig({

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },

            lib: ['app/**.js'],

            gruntfile: ['Gruntfile.js']
        },

        mochacli: {
            options: {
                'check-leaks': true,
                reporter: 'spec',
                ui: 'bdd',
                env: {
                    NODE_ENV: 'testing'
                }
            },

            all: ['test/*.js']
        }

    });


    grunt.registerTask('test', ['jshint', 'mochacli']);

    grunt.registerTask('default', ['test']);

};
