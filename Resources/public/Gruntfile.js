module.exports = function (grunt) {
    grunt.initConfig({
        "pkg": grunt.file.readJSON('package.json'),
        copy: {
          sound_admin: {
            files: [
              {
                expand: true, 
                cwd: 'node_modules/sound-admin/public/css/', 
                src: ['**'], 
                dest: 'css/sound-admin/', filter: 'isFile'},
            ],
          },
          react_select: {
            files: [
              {
                expand: true, 
                cwd: 'node_modules/react-select/dist/', 
                src: ['*.css'], 
                dest: 'css/react-select/', filter: 'isFile'},
            ],
          }
        },
    });
    
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['copy']);
};