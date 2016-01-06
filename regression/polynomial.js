'use strict';
var Matrix = require( '../algebraL/Mat' )
    /** @function
     * Find the polynomial regression of given a set of data
     * @param {Number} n
     * @return {function} unifor distribution function.
     */
module.exports = function ( points, degree ) {
    let ndata = points.length
    let matData = new Matrix( points )
    let _degree = degree > ndata ? ndata : degree + 1
    var polData = Matrix.create( ndata, _degree, function ( i, j ) {
        return Math.pow( matData._( i, 1 ), _degree + 1 - j )
    } )
    return polData.trans( ).x( polData ).inv( ).x( polData.trans( ) ).x(
        matData.filterByPositionColumn( 2 ) )
};
