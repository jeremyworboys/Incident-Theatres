module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadNpmTasks('grunt-exec');


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

            all: ['tests/*.js']
        },

        exec: {
            migrate: {
                cmd: function(direction) {
                    return './node_modules/.bin/migrate -c ./app ' + direction;
                }
            }
        }

    });


    grunt.registerTask('migrate',      'exec:migrate:up');
    grunt.registerTask('migrate:up',   'exec:migrate:up');
    grunt.registerTask('migrate:down', 'exec:migrate:down');

    grunt.registerTask('test', ['jshint', 'mochacli']);

    grunt.registerTask('default', ['test']);

};
