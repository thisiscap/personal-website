module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
      // Compass
      // Compiles SASS
      compass: {
          dist: {
          options: {
              sassDir: '_build/_sass',
              cssDir: '_build/_css',
              specify: '_build/_sass/*.scss',
              environment: 'production',
              outputStyle: 'compressed'
          }
        }
      },
      
      // Watch
      // Watches for changes and re-runs functions again
      watch: {
            css: {
                files: '_build/_sass/*.scss',
                tasks: ['compass', 'autoprefixer'],
                options: {
                    livereload: true
                }
            },
            js:  {
              files: '_build/_js/*.js',
              tasks: [ 'uglify' ]
            }
        },
      
      // Autoprefixer
      // Adds vendor prefixes to final css output
      autoprefixer: {
          options: {
              browsers: ['last 3 versions', 'ie 9']
          },
          single_file: {
                src: '_build/_css/main.css',
                dest: 'assets/css/chris-porter.css'
          }
      },
      
      // Unused
      // Finds unused project files and outputs them to console
      unused: {
          options: {
                reference: 'assets/',
                directory: ['**/*.handlebars', '**/*.html'],
                days: 30,
                remove: false, // set to true to delete unused files from project
                reportOutput: false, // set to 'name.txt' to output as file
                fail: false // set to true to make the task fail when unused files are found
          }
      },
    
      // ImageMin
      // Compresses images
      imagemin: {
          dynamic: {
            options: {
              optimizationLevel: 3, // For .png
              progressive: true // For .jpg
            },
            files: [{
              expand: true,                  // Enable dynamic expansion
              cwd: 'assets/img/',            // cwd is 'current working directory'
              src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
              dest: 'assets/img/'            // Destination path prefix
            }]
          }
        },
    
      // Uglify
      // Merge and tidy up multiple js files
      uglify: {
        files: { 
          src: '_build/_js/*.js',  // source files mask
          dest: 'assets/js',    // destination folder
          expand: true,    // allow dynamic building
          flatten: true,   // remove all unnecessary nesting
          ext: '.min.js'   // replace .js to .min.js
        }
      }
 
  });

  // Load the plugins that provides the above tasks
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-unused');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');
    

  // Default task(s) when running 'grunt'
  grunt.registerTask('default', ['compass', 'uglify', 'autoprefixer', 'watch']);
  
  // Unique task(s) when running 'grunt build'
  grunt.registerTask('build', ['newer:imagemin:dynamic', 'unused']);

};