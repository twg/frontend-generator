var bowerPaths = require('./bowerPaths.js');

module.exports = {
  root: 'dist/',
  styles: {
    watch: ['src/**/*.styl', '!src/styles/vendor/**/*'],
    src: 'src/**/styles.styl',
    dest: 'dist/css'
  },
  scripts: {
    watch: ['src/**/*.js', '!src/scripts/vendor/**/*'],
    src: 'src/**/*.js',
    dest: 'dist/js'
  },
  templates: {
    watch: 'src/**/*.jade',
    src: 'src/**/*.jade',
    dest: 'dist/'
  },
  vendor: {
    styles: {
      watch: ['bower_components/**/*.css', 'bower_components/**/*.styl'],
      src: bowerPaths.styles,
      dest: 'src/styles/vendor'
    },
    scripts: {
      watch: 'bower_components/**/*.js',
      src: bowerPaths.scripts,
      dest: 'src/scripts/vendor'
    }
  }
};
