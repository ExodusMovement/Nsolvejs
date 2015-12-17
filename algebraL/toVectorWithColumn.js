'use strict';
/** @function
 * Generates a vector from a matrix given
 * @param {Object} obj.
 * @return {Object} Vector
 */
function toVectorWithColumn(A) {
  let Matrix = require('./Mat')
  let Vector = require('./vector')
  if (!(A instanceof Matrix)) {
    A = new Matrix(A)
  }
  var array = [],
    _array
  for (var i = 1; i <= A.row; i++) {
    _array = A._(i).array[0]
    array = array.concat(_array)
  }
  return new Vector(array)
}
module.exports = toVectorWithColumn