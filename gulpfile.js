'use strict';

var gulp  = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
      mocha = require('gulp-mocha'),
     gulp = require('gulp'),
     plato = require('gulp-plato');

    // Lint
    gulp.task('lint', function () {
    return gulp.src(['**/*.js', '!./node_modules/**'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
    });
    // Default
    gulp.task('default', ['test','lint'], function () {
    gulp.watch(['**/*.js', '!./node_modules/**'], ['test']);
    });
// Test
    gulp.task( 'test', function () {
   return gulp.src('./test/test.js',{read: false}).pipe(mocha({reporter: 'nyan'}));
  });
// plato
gulp.task('plato', function () {
    return gulp.src(['**/*.js', '!./node_modules/**'])
        .pipe(plato('report', {
            jshint: {
                options: {
                    strict: true
                }
            },
            complexity: {
                trycatch: true
            }
        }));
});
