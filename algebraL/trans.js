'use strict';
/** @function
 * transposed of a matrix.
 * @param {Object} matrix
 * @return {Object} matrix
 */
function trans(B, opt) {
  opt = opt || {
    column: 1
  }
  opt.column = opt.column || 1
  if (!B) {
    return;
  }
  let Matrix = require('./Mat');
  if (!(B instanceof Matrix)) {
    B = new Matrix(B)
  }
  let ii = B.getColumn(opt.column),
    kk = B.row,
    array = [],
    i, k;
  for (i = 1; i <= ii; i++) {
    array[i - 1] = [];
    for (k = 1; k <= kk; k++) {
      array[i - 1][k - 1] = B._(k, i);
    }
  }
  return new Matrix(array);

}
module.exports = function(B, cb, opt) {
  if (cb && typeof cb === 'function') {
    return new Promise(function(full, rej) {
      try {
        full(cb.call(B, null, trans(B, opt)))
      } catch (e) {
        rej(cb.call(B, e, null))
      }
    })
  } else {
    return trans(B, opt);
  }
};