module.exports = function(grunt) {
  var files = {};
  files.vendor = [
    'vendor/bower/jquery/jquery.js',
    'vendor/bower/handlebars/handlebars.js',
    'vendor/bower/ember/ember.js',
    'vendor/bower/ember-data/ember-data.js',
    'vendor/bower/localstorage_adapter/localstorage_adapter.js'
  ];

  files.libs = ['app/js/application.js', 'app/js/router.js', 'app/js/**/*.js'];

  files.css = ['app/css/style.css']


  files.all = files.vendor.concat(files.libs).concat(files.css);
  files.all.push('app/pages/*.html');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat_sourcemap: {
      options: {},
      target: {
        files: {
          'generated/js/libs.js': files.vendor,
          'generated/js/app.js': files.libs,
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
    watch: {
      build: {
        files: files.all,
        tasks: ['build']
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-concat-sourcemap');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('build', ['concat_sourcemap', 'copy']);
};
