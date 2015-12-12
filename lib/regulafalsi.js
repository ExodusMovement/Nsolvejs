'use strict' ;
var sortInterval = require('./sortInterval'),
    testRoot = require('./testRoot') ,
    _ = require('lodash') ;
/**@function
 * This function solve the equation f(x)=0 using the regulafalsi method. To do this beginning in interval([a,b]) using the options.
 * @param {Function} f, {Array} interval, {Object} options.
 * @return {Object} with properties Root, steps number used and method used.
 */
function regulafalsi(f,interval,options) {
      if(!f){return ;}
    if(typeof options === 'number'){options = arguments[3];}
    //Options default
    options = options || { presicion : 0.001 , nstepsmax : 1000 } ;
      options.presicion = options.presicion || 0.001 ;
      options.nstepsmax = options.nstepsmax || 1000 ;
    var presicion = options.presicion,
    A, B, test, x, y,Root , n = 1,nmax = options.nstepsmax ;
    interval = _.clone(interval,true) ;
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
      }
      else {
        A.x = x ;
        A.y = y ;
      }
    }
    //Again test if the solution is in interval.
    test = A.y * B.y > 0 ;
    if ( test ) { return ;  }
    while (!Root && n < nmax) {
      // The regulafalsi method.
      Root = testRoot(A, B, f, presicion) ;
      n++ ;
    }
    return {Root         : Root,
            numSteps     : n,
            method        : 'regulafalsi'
        } ;
}
/**Here we wrapper the function to maje a non-blocking*/
module.exports = function (f,interval,options,cb) {
  if (cb && typeof cb === 'function') {
    return new Promise(function(full,rej){
      try {
        full( cb(regulafalsi(f,interval,options) ))
      } catch (e) {
        rej(null,cb(e))
      }
    }
 )
  } else {
    return  regulafalsi(f,interval,options) 
  }
};
