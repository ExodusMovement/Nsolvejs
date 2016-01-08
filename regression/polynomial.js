'use strict';
var Matrix = require( '../algebraL/Mat' )
  /** @function
   * Find the polynomial regression of given a set of data
   * @param {Number} n
   * @return {function} unifor distribution function.
   */
module.exports = function ( matData, degree ) {
  degree = degree || 1
  let ndata = matData.row
  let _degree = degree > ndata ? ndata + 1 : degree + 1
  let polData = Matrix.create( ndata, _degree, function ( i, j ) {
    return Math.pow( matData._( i, 1 ), j - 1 )
  } )
  let polParams = polData.trans( ).x( polData )
  polParams = polParams.inv( )
  if ( !polParams ) {
    return
  }
  return polParams.x( polData.trans( ) ).x( matData.filterByPositionColumn( 2 ) )
};