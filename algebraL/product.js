'use strict';
/** @function
 * multiply the matrix object.
 * @param {Object} matrix {Object} matrix.
 * @return {Object} matrix
 */
function product( A, B ) {
	if ( !A || !B ) {
		return;
	}
	var Matrix = require( './Mat' );
	if ( !( A instanceof Matrix ) ) {
		A = new Matrix( A )
	}
	if ( !( B instanceof Matrix ) ) {
		B = new Matrix( B )
	}
	var ii = A.row,
		jj, kk, array = [],
		i, j, k;
	for ( i = 1; i <= ii; i++ ) {
		array[ i - 1 ] = [];
		kk = B.getColumn( i )
		for ( k = 1; k <= kk; k++ ) {
			array[ i - 1 ][ k - 1 ] = 0;
			jj = A.getColumn( i )
			for ( j = 1; j <= jj; j++ ) {
				array[ i - 1 ][ k - 1 ] += A._( i, j ) * B._( j, k );
			}
		}
	}
	return new Matrix( array );

}

module.exports = function ( A, B, cb ) {
	if ( cb && typeof cb === 'function' ) {
		return new Promise( function ( full, rej ) {
			try {
				full( cb( null, product( A, B ) ) )
			} catch ( e ) {
				rej( cb( e, null ) )
			}
		} )
	} else {
		return product( A, B );
	}
};
