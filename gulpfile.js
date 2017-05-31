const gulp = require('gulp');
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
  gulp.watch(['./theme/css/*.scss', './theme/js/*.js', './theme/templates/*.hbs', './pages/**/*'], ['css', 'html']);
});

gulp.task('compress', () =>
  gulp
    .src([
      './node_modules/jquery/dist/jquery.js',
      '!./theme/js/*.min.js',
      './theme/js/*.js',
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
    .pipe(gulp.dest('theme/js'))
);

gulp.task('css', ['generate'], () =>
  gulp
    .src('dist/css/main.css')
    .pipe(cleanCSS({ compatibility: 'ie8', processImport: false }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(
      uncss({
        html: ['./**/*.html'],
      })
    )
    .pipe(gulp.dest('dist/css'))
);

gulp.task('webserver', ['default'], () => {
  connect.server({
    port      : 8000,
    root      : 'dist',
    livereload: true,
  });
});

gulp.task('html', () => gulp.src('./**/*.html').pipe(connect.reload()));

gulp.task('generate', ['compress'], shell.task('yarn run event-gen'));

gulp.task('default', ['css'], () =>
  gulp.src('dist/**/*.html').pipe(htmlmin({ collapseWhitespace: true })).pipe(gulp.dest('dist'))
);
