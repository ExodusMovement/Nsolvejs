'use strict';
var Matrix= require('../algebraL/Mat'),
dkronecker = require('../utils/dkronecker');
/** @function
 * Builder of Unit matrix.
 * @param {Number} the length of matrix.
 * @return {Object} matrix
 */

module.exports = function (n) {
  var array = [];
  for (var i = 0; i <n ; i++) {
      array[i]=[];
      for (var j = 0; j <n ; j++) {
          array[i][j]=dkronecker(i,j);
      }
  }
 return new Matrix(array);
}
