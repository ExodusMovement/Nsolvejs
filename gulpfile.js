'use strict';

var gulp  = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    growth = require('./fit/bestfit'),
     nsolve = require('./index'),
     gulp = require('gulp');
     // Datas to test the fit modules.
  var test_array= [[0,40],[1,48],[3,56],[4,70]];
     var test_query = [3.4, 4.8, 8, 11] ;
     var test_y     = [75,83,99,105] ;
     /**@function
     * To test the numerical modules.*/
    function g(x) {
      return Math.cos(x)-x ; //Math.pow(x,5)-16*Math.pow(x,4)+2*Math.pow(x,3)-20*Math.pow(x,2)+6*x-7-1.6*Math.exp(-4*x*x);
    }
   function test() {
    var f = g ;
    // Interval and initial point to use in the numerical modules.
    var initialpoint =  0.5 ;
    var interval =  [-3,5] ;

    console.log(
    'Solve the equation x⁵-16x⁴+2x³-20x²+6x-7-1.6 e^(-4x²) = 0 with initial point random selected  in an interval [-10,10] with a number maximum of steps of 1000 and 1000 partitions on the calculus of numerical derivative.'
    );
    console.log('=> regulafalsi =', nsolve.calculusN.regulafalsi(f,interval));

    console.log('=> bisection =', nsolve.calculusN.bisection(f,interval));

    console.log('=> fixedpoint =', nsolve.calculusN.fixedpoint(f,initialpoint));

    console.log('=> Newton_Raphson =', nsolve.calculusN.Newton_Raphson(f,interval,initialpoint));

    console.log('=> Newton_Raphson_Higherorder =', nsolve.calculusN.Newton_Raphson_Higherorder(f,interval,initialpoint));
    console.log('=> fit =', growth(test_array,test_query,test_y));
    console.log('=> nsolveqn =', nsolve.nsolveqn(f,interval,initialpoint));
    console.log('=> findroot =', nsolve.calculusN.findroot(f,interval,initialpoint));
    }

    // Lint
    gulp.task('lint', function () {
    return gulp.src(['**/*.js', '!./node_modules/**'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
    });
    // Default
    gulp.task('default', ['test','lint'], function () {
    gulp.watch(['**/*.js', '!./node_modules/**'], ['test','lint']);
    });
// Test
    gulp.task( 'test', function () {

    test() ;
    gulp.watch(['**/*.js', '!./node_modules/**'], ['test']);

  });
