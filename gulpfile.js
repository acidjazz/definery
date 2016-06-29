
var gulp = require('gulp');
var sync = require('browser-sync').create();

var notify = require('gulp-notify');

var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var stylus = require('gulp-stylus');
var pug = require('gulp-pug');

var sourcemaps = require('gulp-sourcemaps');

var path = require('path');
var fs = require('fs');

var objectus = require('objectus');

objectus('dat/', function(error, result) {
  if (error) {
    notify(error);
  }
  data = result;
});

gulp.task('objectus', function() {
  objectus('dat/', function(error, result) {

    if (error) {
      notify(error);
    }

    data = result;

  });
  return true;
});

gulp.task('vendors', function() {

  gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/jquery.scrollTo/jquery.scrollTo.min.js'
  ])
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(concat('vendor.min.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('pub/jst/lib'));

});

gulp.task('coffee', function() {

  fs.writeFileSync('pub/jst/data.js', "var data = " + JSON.stringify(data) + ";", 'utf8')

  gulp.src('cof/**/*.coffee')
    .pipe(sourcemaps.init())
    .pipe(coffee({bare: true})
      .on('error', notify.onError(function(error) {
        return {title: "Coffee error", message: error.message + "\r\n" + error.filename + ':' + error.location.first_line, sound: 'Pop'};
      }))
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('pub/jst'))
    .pipe(sync.stream());
});

gulp.task('stylus', function() {

  gulp.src('sty/main.styl')

    .pipe(sourcemaps.init())
    .pipe(stylus({ rawDefine: { data: data } })
    .on('error', notify.onError(function(error) {
      return {title: "Stylus error: " + error.name, message: error.message, sound: 'Pop' };
    })))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('pub/css'))
    .pipe(sync.stream());
});


gulp.task('pug', function() {

  gulp.src('tpl/**/index.pug')
    .pipe(pug({pretty: true, locals: {data: data}})
      .on('error', notify.onError(function(error) {
        return {title: "Jade error: " + error.name, message: error.message, sound: 'Pop' };
      }))
      .on('error', function(error) {
        console.log(error);
      })
    )
    .pipe(gulp.dest('pub'))
    .pipe(sync.stream());

});

var imgwatch;

gulp.task('sync', function() {
  sync.init({
    notify: false,
    open: false,
    server: {
      baseDir: 'pub/',
    },
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: false
    },
    scrollProportionally: false,
    scrollRestoreTechnique: 'cookie'
  });

  gulp.watch('dat/**/*', ['objectus','stylus','pug']);
  gulp.watch('cof/**/*.coffee', ['objectus', 'coffee']);
  gulp.watch('sty/**/*.styl', ['stylus']);
  gulp.watch('tpl/**/*.pug', ['pug']);
  gulp.watch('pub/svg/**/*.svg', ['pug']);
  gulp.watch('pub/img/**/*', ['pug']);

});


gulp.task('watch', function() {
  gulp.watch('dat/**/*', ['objectus','stylus','pug']);
  gulp.watch('cof/**/*.coffee', ['coffee']);
  gulp.watch('sty/**/*.styl', ['stylus']);
  gulp.watch('tpl/**/*.pug', ['pug']);
});

gulp.task('default', ['objectus','coffee', 'stylus', 'pug', 'vendors']);
