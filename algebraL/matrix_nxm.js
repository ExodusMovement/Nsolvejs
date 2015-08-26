'use strict';
var Matrix= require('../algebraL/Mat');
/** @function
 * Builder of a matrix nxm with mapping function of i,j.
 * @param {Number} n {Number} m {Function} mapping .
 * @return {Object} vector
 */
module.exports = function (n,m,map) {
  if (!n || !m || !map) { return ;}
  var array = [],i,j;
  for ( i = 0; i <n ; i++) {
      array[i]=[];
      for ( j = 0; j <m ; j++) {
          array[i][j]=map(i,j);
      }
  }
 return new Matrix(array);
};
