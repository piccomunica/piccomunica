module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'www/css/app.css': 'www/sass/app.sass'
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'www/js/app.min.js': 'www/js/app.js',
          'www/js/controllers.min.js': 'www/js/controllers.js'
        }
      }
    },
    watch: {
      css: {
        files: ['www/sass/app.sass'],
        tasks: ['sass']
      },
      www: {
        files: ['www/js/*.js'],
        tasks: ['uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['sass', 'uglify', 'watch']);

  // exec isn't currently used.
};