'use strict';
var sortInterval = require('./sortInterval');
/**@function
 * This function calculate the values of x_i using npoints (N) in interval ([a,b]) using a pointsDistribution as distribution of this points. The boundary conditions for each one is x_1=a and x_N=b.
 * @param {Number} npoints, {Array} interval, {String} pointsDistribution.
 * @return {Array} with the values of x_i.
 */
module.exports = function (npoints, interval, pointsDistribution) {
    var a, b, N, n, x_n_array = [],
        alpha, beta;
    // The default distribution is the linear.
    pointsDistribution = pointsDistribution || 'linear';
    sortInterval(interval);
    N = npoints;
    a = interval[0];
    b = interval[1];
    var Distribution = {
        'linear': function () {
            alpha = (b - a) / (N - 1);
            beta = a - alpha;
            for (n = 1; n <= N; n++) {
                x_n_array[n] = alpha * n + beta;
            }
        },
        'exponential': function () {
            beta = Math.log(b / a) / (N - 1);
            alpha = Math.exp(Math.log(a) - beta);
            for (n = 1; n <= N; n++) {
                x_n_array[n] = alpha * Math.exp(beta * n);
            }
        },
        'logarithmic': function () {
            beta = (b - a) / Math.log(N);
            alpha = a;
            for (n = 1; n <= N; n++) {
                x_n_array[n] = alpha + beta * Math.log(n);
            }
        },
        'law': function () {
            beta = Math.log(b / a) / Math.log(N);
            alpha = a;
            for (n = 1; n <= N; n++) {
                x_n_array[n] = alpha * Math.pow(n, beta);
            }
        },
        'cuadratic': function () {
            alpha = (b - a + 1 - N * N) / (N - 1);
            beta = a - 1 - alpha;
            for (n = 1; n <= N; n++) {
                x_n_array[n] = n * n + alpha * n + beta;
            }
        },
        'inverse': function () {
            alpha = (1 / b - 1 / a) / (N - 1);
            beta = a - alpha;
            for (n = 1; n <= N; n++) {
                x_n_array[n] = alpha * n + beta;
            }
        },
    };
    Distribution[pointsDistribution]();
    return {
        x_n_array: x_n_array,
        pointsdistribution: pointsDistribution
    };
};
