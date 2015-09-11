'use strict' ;
var sortInterval = require('./sortInterval'),
_ = require('lodash')  ;

/**@function
 * This function solve the equation f(x)=0 using the bisection method.
 * @param {Function} f, {Array} interval, {Object} options.
 * @return {Object} with properties Root, steps number used and method used.
 */
function bisection(f, interval,options) {
    if(!f){return ;}
    if(typeof options === 'number'){options = arguments[3];}
    // Set options the default if is not defined.
    options = options || { presicion : 0.001 , nstepsmax : 100000 } ;
    options.presicion = options.presicion || 0.001 ;
    options.nstepsmax = options.nstepsmax || 100000 ;
    var presicion = options.presicion ;
    interval = _.clone(interval,true) ;
    var A, B, test, x, y ;
    // Sort the interval.
    sortInterval(interval) ;
    A= { x : interval[0]  ,
         y : f(interval[0]) } ;
    B= { x : interval[1]  ,
         y : f(interval[1]) } ;
         // Test if the solution is in interval.
    test = A.y * B.y > 0 ;
    // If not, choices a new point in middle of interval.
    if (test) {
      x = (A.x + B.x) / 2 ;
      y = f(x)  ;
      test = A.y * y > 0 ;
      if (!test) {
        B.x = x ;
        B.y = y ;
      } else {
        A.x = x ;
        A.y = y ;
      }
    }
    //Again test if the solution is in interval.
    test = A.y * B.y > 0 ;
    if (  test) { return ;  }
    var Root ;
    var n = 1 ;
    // Set the maximum of steps allowed.
    var nmax = options.nstepsmax ;
    // The bisection method.
    while (! Root && n < nmax) {
        n++;
        // The bisection method.
        x = (A.x + B.x) / 2 ;
        y = f(x)  ;
        if ( Math.abs(y) <= presicion ) {
          Root=  x ;
        }
        test = A.y * y > 0 ;
        if (!test) {
          B.x = x ;
          B.y = y ;
        }
        else {
          A.x = x ;
          A.y = y ;
        }

    }
    return {Root : Root, numSteps : n , method : 'bisection' } ;

}
module.exports = function (f, interval,options,cb) {
  if (cb && typeof cb === 'function') {
    setTimeout(function () {
      cb(bisection(f, interval,options));
    });
  } else {
    return bisection(f, interval,options) ;
  }
};
