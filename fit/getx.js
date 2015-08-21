'use strict';
var findroot = require('../lib/findroot'), length_get_x ,array_x=[],arrayX = [];

/**@function
 * This function solve the equation h(x)=y_i. The y_i are given into get_x.
 * @param {function} h, {Array} get_x.
 * @return {Array} values of "x".
 */

module.exports = function (h, get_x, interval,initial ) {
  var i, options =  {npoints_DNumeric : 100000, presicion : 0.1 , nstepsmax : 100000  };
  length_get_x = get_x.length ;
  function g(f,y) {
   return function (x) {
     return h(x)-y ;
   };
   }
  for ( i = 0; i < length_get_x; i++) {
     array_x[i] = [];
// Find the root using the module findroot.
     arrayX[i]= findroot(g(h,get_x[i]),interval,initial,options) ;
     if(arrayX[i]){array_x[i][0]=arrayX[i].Root;array_x[i][1]= get_x[i] ;}
  }
   return array_x;
} ;
