'use strict';
/** @function
 * Builder of a matrix nxm with mapping function of i,j.
 * @param {Number} n {Number} m {Function} mapping .
 * @return {Object} vector
 */
 function nxm(n,m,map) {
  var Matrix= require('../algebraL/Mat');
  if (!n || !m || !map) { return ;}
  var array = [],i,j;
  for ( i = 0; i <n ; i++) {
      array[i]=[];
      for ( j = 0; j <m ; j++) {
          array[i][j]=map(i,j);
      }
  }
 return new Matrix(array);
}

module.exports = function (n,m,map,cb) {
  if (cb && typeof cb === 'function') {
    setImmediate(function () {
      cb( nxm(n,m,map) );
    });
  } else {
    return  nxm(n,m,map)  ;
  }
};
