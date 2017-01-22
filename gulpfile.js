const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const connect = require('gulp-connect');
const jsonSchema = require('gulp-json-schema');
const babel = require('gulp-babel');
const shell = require('gulp-shell')

gulp.task('dev', ['webserver'], function () {
    gulp.watch(['./css/*.scss', './js/*.js', './**/*.handlebars', './**/*.json'], ['scss', 'compress', 'generate', 'html']);
});

gulp.task('compress', function() {
  gulp.src(['./node_modules/jquery/dist/jquery.js', './js/*.js', './node_modules/materialize-css/dist/js/materialize.js'])
    .pipe(concat('main.js'))
    .pipe(babel())
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

gulp.task('webserver',['default'], function() {
  connect.server({
    port: 8000,
    root: 'dist',
    host: 'techweek.dev',
    livereload: true
  });
});


gulp.task('fonts', function() {
  return gulp.src('./node_modules/materialize-css/fonts/**')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('html', function() {
  gulp.src('./**/*.html')
    .pipe(connect.reload());
});

gulp.task('validate', function() {
  return gulp.src(['./events/*.json'])
    .pipe(jsonSchema('schema.json'));
});

gulp.task('generate', ['validate'], shell.task("node bin/generate.js"));

gulp.task('default', ['generate', 'compress', 'scss', 'fonts']);
