'use strict';
var deltax = require( './deltax' ),
  derivativenumeric = require( './derivativenumeric' ),
  linear_interpolation = require( './linearinterpolation' ),
  _ = {}
_.clone = require( '../utils/clone' );
/** @constructor
 * Constructor that define the numeric derivative of f(x) using npoints
 * in interval ([a,b]).
 * @param {Function} f {Number} npoints {Array} interval.
 */
var Nof = function ( f, npoints, interval ) {
  interval = _.clone( interval, true );
  var array_of_derivative = derivativenumeric( f, npoints, interval );
  //** @method that define the derivative of f(x)*/
  this.f_x = new linear_interpolation( array_of_derivative.dfdx_array ).function_interpolated;
};
module.exports.Nof = Nof
module.exports.deltax = deltax;
module.exports.derivativenumeric = derivativenumeric;
module.exports.linearinterapolation = linear_interpolation;