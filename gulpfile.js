var gulp = require('gulp');

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
 

gulp.task('jshint', function () {
  return gulp.src('./*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('watch', function () {
  gulp.watch('./*.js', ['jshint']);
});

gulp.task('default', ['jshint', 'watch']);
