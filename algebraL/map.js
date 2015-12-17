'use strict';
/** @function
 * Mapping the matrix object with a function given.
 * @param {Function} map {Object} matrix.
 * @return {Object} matrix
 */
function mapp(map, B) {
    if (!map || !B) {
        return;
    }
    let Matrix = require('./Mat');
    if (!(B instanceof Matrix)) {
        B = new Matrix(B)
    }
    if (typeof map === 'function') {
        let ii = B.row,
            kk, array = [],
            i, k;
        for (i = 1; i <= ii; i++) {
            array[i - 1] = [];
            kk = B.getColumn(i)
            for (k = 1; k <= kk; k++) {
                array[i - 1][k - 1] = map.call(B, B._(i, k), i, k);
            }
        }
        return new Matrix(array);
    }
}
module.exports = function (map, B, cb) {
    if (cb && typeof cb === 'function') {
        return new Promise(function (full, rej) {
            try {
                full(cb.call(B, null, mapp(map, B)))
            } catch (e) {
                rej(cb.call(B, e, null))
            }
        })
    } else {
        return mapp(map, B);
    }
};