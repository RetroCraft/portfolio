var gulp          = require('gulp');
var sass          = require('gulp-sass');
var sftp          = require('gulp-sftp');
var changed       = require('gulp-changed');
var postcss       = require('gulp-postcss');
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('autoprefixer');
var fs            = require('fs')
var del           = require('del');
var merge2        = require('merge2');

var src = 'src/**';
var dist = 'dist/';

var uploadable = [src, "!src/css/**", "!src/js/**"];

gulp.task('clean', function () {
  del.sync(['./dist/**', '!./dist']);
});

gulp.task('js', function() {
  gulp.src(['src/js/**/*.js', 'node_modules/skrollr/dist/skrollr.min.js'])
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('main.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(sftp({
      host: 'retrocraft.ca',
      user: 'james',
      key: '/home/james/.ssh/james@retrocraft.ca',
      remotePath: '/var/www/main/js'
    }));
});

gulp.task('sass', function() {
  gulp.src('src/css/main.scss')
    .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: 'compressed' }))
      .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(sftp({
      host: 'retrocraft.ca',
      user: 'james',
      key: '/home/james/.ssh/james@retrocraft.ca',
      remotePath: '/var/www/main/css'
    }));
});

gulp.task('upload', function () {
  return gulp.src(uploadable)
    .pipe(changed(dist))
    .pipe(gulp.dest(dist))
    .pipe(sftp({
      host: 'retrocraft.ca',
      user: 'james',
      key: '/home/james/.ssh/james@retrocraft.ca',
      remotePath: '/var/www/main'
    }));
});

gulp.task('default', ['clean'], function () {
  gulp.watch(uploadable, ['upload']);
  gulp.watch(['src/css/**/*.scss'], ['sass']);
  gulp.watch(['src/js/*.js'], ['js']);
})