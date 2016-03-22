'use strict';

var gulp = require('gulp');
var awspublish = require('gulp-awspublish');

gulp.task('build', function() {
  return gulp.src('src/**/*')
    .pipe(gulp.dest('build'));
});

gulp.task('deploy', ['build'], function(callback) {
  var publisher = awspublish.create({
    "params": {
      "Bucket": "www.example.com"
    },
    "endpoint": "s3-ap-northeast-1.amazonaws.com"
  });

  gulp.src('build/**/*')
    .pipe(publisher.publish())
    .pipe(publisher.sync())
    .pipe(awspublish.reporter());
});
