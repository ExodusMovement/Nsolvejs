'use strict';
/** @function
 * transposed of a matrix.
 * @param {Object} matrix
 * @return {Object} matrix
 */
function trans( B ) {
	if ( !B ) {
		return;
	}
	//var Matrix = require('./Mat');
	//if (!(B instanceof Matrix)) {B = new Matrix(B)}
	var ii = B.getColumn( 1 ),
		kk = B.row,
		array = [],
		i, k;
	for ( i = 1; i <= ii; i++ ) {
		array[ i - 1 ] = [];
		for ( k = 1; k <= kk; k++ ) {
			array[ i - 1 ][ k - 1 ] = B._( k, i );
		}
	}
	var Matrix = require( './Mat' );
	return new Matrix( array );

}
module.exports = function ( B, cb ) {
	if ( cb && typeof cb === 'function' ) {
		return new Promise( function ( full, rej ) {
			try {
				full( cb.call( B, null, trans( B ) ) )
			} catch ( e ) {
				rej( cb.call( B, e, null ) )
			}
		} )
	} else {
		return trans( B );
	}
};
