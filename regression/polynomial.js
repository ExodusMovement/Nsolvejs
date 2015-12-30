'use strict';
var Matrix = require( '../algebraL/Mat' )
    /** @function
     * Build the uniform distribution over [1,n].
     * @param {Number} n
     * @return {function} unifor distribution function.
     */
module.exports = function ( points, degree ) {
    let ndata = points.length
    let matData = new Matrix( points )
    let polData = Matrix.create( ndata, degree + 1, function ( i, j ) {
        return Math.pow( matData._( i, 1 ), j - 1 )
    } )
    console.log( polData.trans( ).x( polData ).inv( ).x( polData.trans( ) ) )
    console.log( polData.filterByPositionColumn( [ 0, 1 ] ) );
};
console.log( module.exports( [ [ 1, 3 ], [ 2, 6 ], [ 3, 3 ], [ 4, 10 ], [
            5, 19 ] ], 4 ) )
