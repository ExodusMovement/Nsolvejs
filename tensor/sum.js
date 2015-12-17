'use strict';
/** @function
 * sum  the Tensor object.
 * @param {Object} Tensor {Object} Tensor.
 *@return {Object} Tensor
 */
var sum = function (A, B) {
    if (!A || !B) {
        return;
    }
    var Tensor = require('./create');
    if (!(A instanceof Tensor)) {
        A = new Tensor(A)
    }
    if (!(B instanceof Tensor)) {
        B = new Tensor(B)
    }
    var i, ii = A._fac,
        array = []
    for (i = 1; i <= ii; i++) {
        array[i - 1] = typeof A._(i) === 'object' ? sum(A._(i), B._(i)) : A._(i) + B._(i)
    }
    return new Tensor(array);
};

function addd(array) {
    var l = array.length,
        A = array[0],
        B, p;
    for (p = 1; p < l; p++) {
        B = array[p];
        A = sum(A, B);
    }
    return A;
}
module.exports = function () {
    var arg = Array.prototype.slice.call(arguments);
    var cb = arguments[arguments.length - 1];
    if (cb && typeof cb === 'function') {
        arg.pop();
        return new Promise(function (full, rej) {
            try {
                full(cb(null, addd(arg)))
            } catch (e) {
                rej(cb(e, null))
            }
        })
    } else {
        return addd(arg);
    }
};
