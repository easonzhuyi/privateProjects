module.exports = function(grunt) {

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  // Project configuration.
  grunt.initConfig({
    //Read the package.json (optional)
    pkg: grunt.file.readJSON('package.json'),
  // Metadata.

  banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
             '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
             '* Copyright (c) <%= grunt.template.today("yyyy") %> ',

    compass: {                  // compass任务
       dist: {                   // 一个子任务
             options: {           // 任务的设置             sassDir: '   imagesDir: '../images',
             httpPath: "/",
             relativeAssets: true,
             boring: true,
             debugInfo: true,
             outputStyle: 'compressed',
             raw: 'preferred_syntax = :scss\n',
             environment: 'production'
             }
       },
       dev: {                    // 另一个子任务
             options: {              // 任务的设置
             sassDir: '_source/sass',
             cssDir: 'css',
             imagesDir: 'images',
             httpPath: "/",
             relativeAssets: true,
             boring: true,
             debugInfo: true,
             outputStyle: 'compact',
             raw: 'preferred_syntax = :scss\n',
             environment : 'development'
             }
         }
   },
    //Task configuration.
    /*qunit: {
    files: ['*.html']
    },*/
    watch: {
      /*html: {
        files:['*.html','*.htm'],
        tasks:['htmlhint']
      },*/
      css: {
        files: ['_source/sass/**/*.scss'],
                                            tasks: ['compass'],
                                            //options: {
        // Start a live reload server on the default port 35729
        //livereload: true,
        //},
      },
      js: {
        files: ['js/*.js'],
        tasks: ['uglify']
      },
      options: {
        // Start another live reload server on port 1337
        //livereload: 1334,
      },
    },
        uglify: {
        options: {
        banner: '/*! This is uglify test - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      task: {
        files: {
          'js/common.min.js': ['js/common.js']
        }
      }
      },
    htmlhint: {
        build: {
            options: {
                'tag-pair':true,
                'tag-self-close':true,
                'tagname-lowercase':true,
                'attr-lowercase':true,
                'attr-value-double-quotes':true,
                'doctype-first':true,
                'doctype-html5':true,
                'spec-char-escape':true,
                'id-unique':true,
                'head-script-disabled':true,
                'style-disabled':false
            },            src:['../*.html','../*.htm']        }
    },
    browserSync: {
        dev: {
            bsFiles: {
                src : [
                    'css/**/*.css',
                    'images/**/*.jpg',
                    'images/**/*.png',
                    'js/**/*.js',
                    './**/*.php',
                    './**/*.html',
                    './**/*.htm'
                ]
            },
            options: {
                watchTask: true,
                debugInfo: true,
                host : "/",
                ghostMode: {
                    clicks: true,
                    scroll: true,
                    links: true,
                    forms: true
                }
            }
        }
    }
  });

  // These plugins provide necessary tasks.
  //grunt.loadNpmTasks('grunt-contrib-compass');
  /*grunt.loadNpmTasks('grunt-contrib-qunit');*/
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task.
  grunt.registerTask('default', ["browserSync", "watch"]);
  grunt.registerTask('dev', [ 'browser_sync', 'watch' ]);
};
