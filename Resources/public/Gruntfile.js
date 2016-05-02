module.exports = function (grunt) {
    grunt.initConfig({
        "pkg": grunt.file.readJSON('package.json'),
        copy: {
          main: {
            files: [
              {
                expand: true, 
                cwd: 'node_modules/sound-admin/public/css/', 
                src: ['**'], 
                dest: 'css/sound-admin/', filter: 'isFile'},
            ],
          },
        },
    });
    
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['copy']);
};