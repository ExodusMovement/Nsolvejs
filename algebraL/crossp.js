'use strict';
let levicivita = require('../utils/levi_civita');
/** @function
 * croos Product beetwen vectors.
 * @param {Object} vector {Object} vector.
 * @return {Object} vector
 */
function crossp(A, B) {
    if (!A && !B) {
        return;
    }
    let Vector = require('./vector');
    if (!(A instanceof Vector) && Array.isArray(A)) {
        A = new Vector(A)
    }
    if (!(B instanceof Vector) && Array.isArray(B)) {
        B = new Vector(B)
    }
    let i, j, k, array = [];
    for (i = 0; i < 3; i++) {
        array[i] = 0;
        for (j = 0; j < 3; j++) {
            for (k = 0; k < 3; k++) {
                array[i] = array[i] + A.array[j][0] * B.array[k][0] * levicivita[i][j][k];
            }
        }
    }
    return new Vector(array);
}

function addd(array) {
    let l = array.length,
        A = array[0],
        B, p;
    for (p = 1; p < l; p++) {
        B = array[p];
        A = crossp(A, B);
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
        return new Promise(function (full, rej) {
            try {
                full(cb.call(this, null, addd(arg)))
            } catch (e) {
                rej(cb.call(this, e, null))
            }
        })
    } else {
        return addd(arg);
    }
};
