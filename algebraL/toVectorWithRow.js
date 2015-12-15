'use strict';
/** @function
 * Generates a vector from a matrix given
 * @param {Object} obj.
 * @return {Object} Vector
 */
function toVectorWithRow( A ) {
	let Matrix = require( './Mat' )
	let Vector = require( './vector' )
	if ( !( A instanceof Matrix ) ) {
		A = new Matrix( A )
	}
	let array = []
	for ( var i = 1; i <= A.row; i++ ) {
		array = array.concat( A._( i )
			.array[ 0 ] )
	}
	return new Vector( array )
}
module.exports = toVectorWithRow
