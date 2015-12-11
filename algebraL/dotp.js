'use strict';
var Matrix = require('./Mat');

/** @function
 * Dot Product beetwen vectors.
 * @param {Object} vector {Object} vector.
 * @return {Number} dot product
 */
 function dot(A,B) {
  if (!A && !B) { return ;}
  if (!(A instanceof Matrix) && Array.isArray(A)) {A = Matrix(A)}
  if (!(B instanceof Matrix) && Array.isArray(B)) {B = Matrix(B)}
  return  A.matrix.trans().x(B.matrix).array[0][0];
}
module.exports = function (A,B,cb) {
  if (cb && typeof cb === 'function') {
    return new Promise(function(full,rej){
      try {
        full(cb(null,dot(A,B)))
      } catch (e) {
        rej(cb(e))
      }
    }
 )
  } else {
    return dot(A,B) ;
  }
};
