var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

gulp.task('dev', ['compress', 'minify-css', 'less', 'webserver'], function () {
    gulp.watch(['./css/*.less', './js/*.js'], ['less', 'compress']);
});

gulp.task('compress', function() {
  gulp.src('js/*.js')
    .pipe(minify({
        ext:{
            min:'.min.js'
        },
        exclude: ['tasks'],
        noSource: true,
        ignoreFiles: ['.combo.js', '*.min.js']
    }))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('less', function() {
  return gulp.src('css/*.less')
    .pipe(less())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('webserver', function() {
  connect.server({
    port: 8000,
    host: 'techweek.dev'
  });
});

gulp.task('default', ['compress', 'minify-css', 'less']);
