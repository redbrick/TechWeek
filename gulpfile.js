var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var jsonSchema = require('gulp-json-schema');

gulp.task('dev', ['compress', 'scss', 'webserver', 'validate'], function () {
    gulp.watch(['./css/*.scss', './js/*.js', './**/*.html'], ['scss', 'compress', 'html']);
});

gulp.task('compress', function() {
  gulp.src(['js/*.js', 'node_modules/materialize-css/dist/js/materialize.js'])
    .pipe(concat('main.js'))
    .pipe(minify({
        ext:{
            min:'.min.js'
        },
        exclude: ['tasks'],
        noSource: true,
        ignoreFiles: ['.combo.js', '*.min.js']
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('scss', function() {
  return gulp.src('css/main.scss')
    .pipe(sass())
    .pipe(cleanCSS({compatibility: 'ie8', processImport: false}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('webserver', function() {
  connect.server({
    port: 8000,
    host: 'techweek.dev',
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src('./**/*.html')
    .pipe(connect.reload());
});

gulp.task('validate', () => {
  return gulp.src(['./events.json', './2016/*.json', './2015/*.json'])
    .pipe(jsonSchema('schema.json'));
});

gulp.task('default', ['compress', 'scss', 'validate']);
