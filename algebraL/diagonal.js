'use strict';
/** @function
 * diagonal of a matrix.
 * @param {Object} matrix
 * @return {Object} matrix
 */
function diagonal( B ) {
	if ( !B ) {
		return;
	}
	let Matrix = require( './Mat' );
	if ( !( B instanceof Matrix ) ) {
		B = new Matrix( B )
	}
	let ii = B.row > B.getColumn( 1 ) ? B.getColumn( 1 ) : B.row,
		array = [],
		i;
	for ( i = 1; i <= ii; i++ ) {
		array[ i - 1 ] = [ B._( i, i ) ];
	}
	return new Matrix( array );
}
module.exports = function ( B, cb ) {
	if ( cb && typeof cb === 'function' ) {
		return new Promise( function ( full, rej ) {
			try {
				full( cb.call( B, null, diagonal( B ) ) )
			} catch ( e ) {
				rej( cb.call( B, e, null ) )
			}
		} )
	} else {
		return diagonal( B );
	}
};
