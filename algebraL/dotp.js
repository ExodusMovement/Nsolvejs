'use strict';
/** @function
 * Dot Product beetwen vectors.
 * @param {Object} vector {Object} vector.
 * @return {Number} dot product
 */
module.exports = function (A,B) {
  return  A.matrix.trans().x(B.matrix).array[0][0];
};
