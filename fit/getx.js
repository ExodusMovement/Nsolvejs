'use strict';
var length_get_x ,array_x=[],arrayX = [];
/**@function
 * This function solve the equation h(x)=y_i. The y_i are given into get_x.
 * @param {function} h, {Array} get_x.
 * @return {Array} values of "x".
 */
module.exports = function (h, get_x ) {
  if (!h) {return ;}
  var i;
  length_get_x = get_x.length ;
  for ( i = 0; i < length_get_x; i++) {
     array_x[i] = [];
// Find the root using the inverse functions.
     arrayX[i]= h(get_x[i]);
     if(arrayX[i]){array_x[i][0]=arrayX[i] ; array_x[i][1]= get_x[i] ;}
  }
   return array_x;
} ;
