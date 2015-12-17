'use strict';
var linear_interpolation = require('./linearinterpolation'),
    derivativenumericOpt = require('./derivativenumericOpt'),
    _ = require('lodash');
/** @constructor
 * Constructor that define the numeric derivative of f(x) using npoints
 * in interval ([a,b]).
 * @param {Function} f {Number} npoints {Array} interval.
 */
var Nof = function (f, npoints, interval) {
    interval = _.clone(interval, true);
    var array_of_derivative = derivativenumericOpt(f, npoints, interval);
    //** @method that define the derivative optimized of f(x)*/
    this.f_x = new linear_interpolation(array_of_derivative.dfdx_array).function_interpolated;
};
module.exports.Nof = Nof
module.exports.linearinterapolation = linear_interpolation;
