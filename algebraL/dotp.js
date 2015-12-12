'use strict';


/** @function
 * Dot Product beetwen vectors.
 * @param {Object} vector {Object} vector.
 * @return {Number} dot product
 */
 function dot(A,B) {
  if (!A && !B) { return ;}
  var Vector = require('./vector');
  if (!(A instanceof Vector)) {A = new Vector(A)}
  if (!(B instanceof Vector)) {B =new  Vector(B)}
  return  A.matrix.trans().x(B.matrix).array[0][0];
}
module.exports = function (A,B,cb) {
  if (cb && typeof cb === 'function') {
    return new Promise(function(full,rej){
      try {
        full(cb(null,dot(A,B)))
      } catch (e) {
        rej(null,cb(e))
      }
    }
 )
  } else {
    return dot(A,B) ;
  }
};
