'use strict';
const sortInterval = require('./sortInterval');
let D = require('./derivativeN'),
    _ = {};
_.clone = require('../utils/clone');

/** @function
 * This function solve the equation f(x)=0 using the Newthon-Rapshon method.
 * @param {Function} f, {Array} interval, {Number}point_initial {Object} options.
 * @return {Object} with properties Root, steps number used and method used.
 */
function NR(f, interval, point_initial, options) {
    if (!f) {
        return;
    }
    if (typeof point_initial === 'object') {
        options = point_initial;
        point_initial = undefined;
    }
    options = options || {
        npointsDNumeric: 100000,
        presicion: 0.001,
        nstepsmax: 100000
    };
    options.presicion = options.presicion || 0.001;
    options.npointsDNumeric = options.npointsDNumeric || 100000;
    options.nstepsmax = options.nstepsmax || 100000;
    interval = _.clone(interval, true);
    const presicion = options.presicion;
    let x_n, x_n_1, y_n, Root, a, b, n,
        npoints = options.npointsDNumeric,
        df_dx, y_n_1, yprime_n_1;
    sortInterval(interval);
    a = interval[0];
    b = interval[1];
    // Calculate the derivative of f(x).
    const DNof = new D.Nof(f, npoints, [ a, b ]);
    df_dx = DNof.f_x;
    // If the point_initial is not defined, is taken like a random number in the interval.
    point_initial = point_initial || (b - a) / 2;
    x_n_1 = point_initial;
    const nmax = options.nstepsmax;
    n = 1;
    while (!Root && n < nmax) {
        n++;
        y_n_1 = f(x_n_1);
        yprime_n_1 = df_dx(x_n_1);
        // Newthon-Rapshon method.
        x_n = x_n_1 - y_n_1 / yprime_n_1;
        if (!x_n || x_n < a || x_n > b) {
            break;
        }
        y_n = f(x_n);
        if (Math.abs(y_n) <= presicion) {
            Root = x_n;
        }
        x_n_1 = x_n;
    }
    return {
        Root,
        numSteps: n,
        method: 'Newton_Raphson'
    };
}

/** Here we wrapper the function to maje a non-blocking*/
module.exports = function(f, interval, point_initial, options, cb) {
    if (cb && typeof cb === 'function') {
        return new Promise((full, rej) => {
            try {
                full(cb(NR(f, interval, point_initial, options)));
            } catch (e) {
                rej(cb(e, null));
            }
        });
    }
    return NR(f, interval, point_initial, options);
};
