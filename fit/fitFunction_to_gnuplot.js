'use strict';
/**@function
 * The function to use in the fit.
 * @param {Number} variable x, {String} nameF, {Array} equationFit.
 * @return {Function}.
 */
Number.prototype.truncate = function ( n ) {
  return Math.floor( this * Math.pow( 10, n ) ) / Math.pow( 10, n );
};
module.exports = function ( nameF, equationFit ) {
  var Fname = {
    linear: function ( ) {
      return equationFit[ 1 ].truncate( 5 ) + '*x+' + equationFit[ 0 ].truncate(
        5 );
    },
    inverse: function ( ) {
      return equationFit[ 1 ].truncate( 5 ) + '/(x-' + equationFit[ 0 ].truncate(
        5 ) + ')';
    },
    sqrt: function ( ) {
      return equationFit[ 1 ].truncate( 5 ) + '*sqrt(x)+' + equationFit[
        0 ].truncate( 5 );
    },
    exponential: function ( ) {
      return equationFit[ 0 ].truncate( 5 ) + '*exp(' + equationFit[ 1 ].truncate(
        5 ) + '*x)';
    },
    logarithmic: function ( ) {
      return equationFit[ 0 ].truncate( 5 ) + '+' + equationFit[ 1 ].truncate(
        5 ) + '*log(x)';
    },
    power: function ( ) {
      return equationFit[ 0 ].truncate( 5 ) + '*x**' + equationFit[ 1 ].truncate(
        5 );
    },
    polynomial: function ( ) {
      return equationFit[ 0 ].truncate( 5 ) + '+' + equationFit[ 1 ].truncate(
        5 ) + '*x+' + equationFit[ 2 ].truncate( 5 ) + '*x**2';
    }
  };
  return Fname[ nameF ]( );
};