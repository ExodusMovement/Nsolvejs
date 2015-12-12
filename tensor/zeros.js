'use strict';
var builder = require('./matrix_nxm');

/** @function
 * Builder of matrix with zeros.
 * @param {Number} the length of matrix.
 * @return {Object} matrix
 */
 function zeros(n,m) {
   m= m || n
 return builder(n,m,function () {
 	return 0;
 })
}

module.exports = function (n,m,cb) {
  if (cb && typeof cb === 'function') {
    setImmediate(function () {
      cb(zeros(n,m));
    });
  } else {
    return zeros(n,m) ;
  }
};
