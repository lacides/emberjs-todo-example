YAML = require('yamljs');

module.exports = function(grunt) {
  var files = YAML.load('config.yml');
  files.all = [].concat.apply([], files.all);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      build: {
        files: {
          'generated/css/style.css': files.css
        }
      }
    },
    concat_sourcemap: {
      options: {},
      target: {
        files: {
          'generated/js/libs.js': files.libs,
          'generated/js/app.js': files.app
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand:true, src: ['**'], dest: 'generated/img/', cwd: 'app/img/'},
          {expand: true, src: ['*.html'], dest: 'generated/', cwd: 'app/pages/'}
        ]
      }
    },
    jshint: {
      all: files.app,
      options: {
        reporter: require('jshint-stylish')
      }
    },
    watch: {
      build: {
        files: files.all,
        tasks: ['build', 'jshint:all']
      }
    },
    execute: {
      server: {
          src: 'app.js'
      }
    },
    emberTemplates: {
      compile: {
        options: {
          templateBasePath: /app\/templates\//
        },
        files: {
          'generated/js/templates.js': files.templates
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-concat-sourcemap');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-execute');

  grunt.registerTask('build', ['emberTemplates', 'sass:build', 'concat_sourcemap', 'copy']);
  grunt.registerTask('run', ['build', 'execute:server']);
};
