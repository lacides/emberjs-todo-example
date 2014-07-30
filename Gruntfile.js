YAML = require('yamljs');

module.exports = function(grunt) {
  var files = YAML.load('config.yml');
  files.all = [].concat.apply([], files.all);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat_sourcemap: {
      options: {},
      target: {
        files: {
          'generated/js/libs.js': files.libs,
          'generated/js/app.js': files.app,
          'generated/css/style.css': files.css
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
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-concat-sourcemap');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-execute');

  // Default task(s).
  grunt.registerTask('build', ['concat_sourcemap', 'copy']);
  grunt.registerTask('run', ['build', 'execute:server']);
};
