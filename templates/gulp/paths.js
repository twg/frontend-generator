var bowerPaths = require('./bowerPaths.js');

module.exports = {
  root: 'dist/',
  styles: {
    watch: ['lib/**/*.styl', '!lib/styles/vendor/**/*'],
    src: 'lib/**/styles.styl',
    dest: 'dist/css'
  },
  scripts: {
    watch: ['lib/**/*.js', '!lib/scripts/vendor/**/*'],
    src: 'lib/**/*.js',
    dest: 'dist/js'
  },
  templates: {
    watch: 'lib/**/*.jade',
    src: 'lib/**/*.jade',
    dest: 'dist/'
  },
  vendor: {
    styles: {
      watch: ['bower_components/**/*.css', 'bower_components/**/*.styl'],
      src: bowerPaths.styles,
      dest: 'lib/styles/vendor'
    },
    scripts: {
      watch: 'bower_components/**/*.js',
      src: bowerPaths.scripts,
      dest: 'lib/scripts/vendor'
    }
  }
};
