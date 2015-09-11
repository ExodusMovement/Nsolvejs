'use strict';
/** @function
 * Dot Product beetwen vectors.
 * @param {Object} vector {Object} vector.
 * @return {Number} dot product
 */
 function dot(A,B) {
  if (!A && !B) { return ;}
  return  A.matrix.trans().x(B.matrix).array[0][0];
}
module.exports = function (A,B,cb) {
  if (cb && typeof cb === 'function') {
    setImmediate(function () {
      cb(dot(A,B));
    });
  } else {
    return dot(A,B) ;
  }
};
