'use strict';
/** @function
 * Up concat of a matrix.
 * @param {Object} matrix
 * @return {Object} matrix
 */
function concat(A, B) {
    if (!B || !A) {
        return;
    }
    let Matrix = require('./Mat');
    if (!(B instanceof Matrix)) {
        B = new Matrix(B)
    }
    if (!(A instanceof Matrix)) {
        A = new Matrix(A)
    }
    let array = B.array.concat(A.array)
    return new Matrix(array);
}
function addd(array) {
    let l = array.length,
        A = array[0],
        B, p;
    for (p = 1; p < l; p++) {
        B = array[p];
        A = concat(A, B);
    }
    return A;
}
module.exports = function (arg) {
    if (arg === undefined) {return  }
  if (arguments.length >1) {
    arg =  Array.prototype.slice.call(arguments)
  }
    let cb = arg[arg.length - 1];
    if (cb && typeof cb === 'function') {
        arg.pop();
        return new Promise(function (full, rej) {
            try {
                full(cb.call(null, null,addd(arg)))
            } catch (e) {
                rej(cb.call(null,e, null))
            }
        })
    } else {
        return addd(arg);
    }
};
