module.exports = function(grunt) {
    var live = grunt.option('live') ? true : false;
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            docs: {
                options: {
                    hostname: '*',
                    port: '3000',
                    base: 'docs'
                }
            },
            alive: {
                options: {
                    hostname: '*',
                    port: '3000',
                    base: 'docs',
                    keepalive:true
                }
            }
        },
        watch: {
            scripts: {
                files: 'src/*.js',
                tasks: ['docsbuild']
            },
            style: {
                files: 'src/*.css',
                tasks: ['docsbuild']
            }
        },
        jshint: {
            scripts: '<%= watch.scripts.files %>'
        },
        clean: {
            docs: {
                src: '<%= connect.docs.options.base %>'
            }
        },
        rename:{
            docco:{
                src: 'docs/franim.html',
                dest: 'docs/index.html'
            }
        },
        docco:{
            build:{
                src: ['<%= watch.scripts.files %>'],
                options: {
                    layout: 'parallel',
                    css: 'src/docco.css',
                    output: '<%= connect.docs.options.base %>'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-docco');
    grunt.loadNpmTasks('grunt-rename');

    grunt.registerTask('default', [
        'docsbuild',
        'connect:docs',
        'watch'
    ]);
    grunt.registerTask('docsbuild', [
        'jshint:scripts',
        'clean:docs',
        'docco:build',
        'rename:docco',
    ]);
    grunt.registerTask('docs', [
        'docsbuild',
        'connect:alive',
    ]);

};