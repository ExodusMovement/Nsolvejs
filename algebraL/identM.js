'use strict';
let dkronecker = require('../utils/dkronecker');
/** @function
 * Builder of Unit matrix.
 * @param {Number} the length of matrix.
 * @return {Object} matrix
 */
function ident(n, m) {
    m = m || n
    let Matrix = require('../algebraL/Mat');
    if (!n) {
        return;
    }
    let array = [];
    for (let i = 0; i < n; i++) {
        array[i] = [];
        for (let j = 0; j < m; j++) {
            array[i][j] = dkronecker(i, j);
        }
    }
    return new Matrix(array);
}
module.exports = function (n, m, cb) {
    if (cb && typeof cb === 'function') {
        return new Promise(function (full, rej) {
            try {
                full(cb.call(this, null, ident(n, m)))
            } catch (e) {
                rej(cb.call(this, e, null))
            }
        })
    } else {
        return ident(n, m);
    }
};