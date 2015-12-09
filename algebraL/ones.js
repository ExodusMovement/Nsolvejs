'use strict';
var builder = require('./matrix_nxm');

/** @function
 * Builder of matrix with ones.
 * @param {Number} the length of matrix.
 * @return {Object} matrix
 */
 function ones(n,m) {
   m= m || n
 return builder(n,m,function () {
 	return 1;
 })
}

module.exports = function (n,m,cb) {
  if (cb && typeof cb === 'function') {
    setImmediate(function () {
      cb(ones(n,m));
    });
  } else {
    return ones(n,m) ;
  }
};
