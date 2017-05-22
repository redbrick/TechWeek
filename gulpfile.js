const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const connect = require('gulp-connect');
const babel = require('gulp-babel');
const shell = require('gulp-shell');
const htmlmin = require('gulp-htmlmin');
const uncss = require('gulp-uncss');

gulp.task('dev', ['webserver'], () => {
  gulp.watch(['./css/*.scss', './js/*.js', './templates/*.hbs', './**/*.json', './**/*.md'], [
    'scss',
    'compress',
    'generate',
    'html',
  ]);
});

gulp.task('compress', () => gulp
  .src([
    './node_modules/jquery/dist/jquery.js',
    './js/*.js',
    './node_modules/materialize-css/dist/js/materialize.js',
  ])
  .pipe(concat('main.js'))
  .pipe(babel())
  .pipe(
    minify({
      ext: {
        min: '.min.js',
      },
      exclude    : ['tasks'],
      noSource   : true,
      ignoreFiles: ['.combo.js', '*.min.js'],
    })
  )
  .pipe(gulp.dest('dist/js')));

gulp.task('scss', ['generate'], () =>
  gulp
    .src('css/main.scss')
    .pipe(sass())
    .pipe(cleanCSS({ compatibility: 'ie8', processImport: false }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uncss({
      html: ['./**/*.html'],
    }))
    .pipe(gulp.dest('dist/css')));

gulp.task('webserver', ['default'], () => {
  connect.server({
    port      : 8000,
    root      : 'dist',
    livereload: true,
  });
});

gulp.task('fonts', () =>
  gulp.src('./node_modules/materialize-css/fonts/**').pipe(gulp.dest('dist/fonts')));

gulp.task('html', () => gulp.src('./**/*.html').pipe(connect.reload()));

gulp.task('generate', shell.task('node bin/generate.js'));

gulp.task('default', ['compress', 'scss', 'fonts'], () =>
  gulp.src('dist/**/*.html').pipe(htmlmin({ collapseWhitespace: true })).pipe(gulp.dest('dist')));
