module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      min: {
        options: {
          sourceMap: 'blobimage.js.source'
        },
        files: {
          'blobimage.min.js': [ 'blobimage.js' ]
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', [ 'uglify' ]);
};