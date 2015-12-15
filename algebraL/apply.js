'use strict';
/** @function
 * multiply the matrix object.
 * @param {Object} matrix {Object} matrix.
 * @return {Object} matrix
 */
function apply( A, B ) {
	let a
	if ( !A || !B ) {
		return;
	}
	let Matrix = require( './Mat' );
	if ( !( A instanceof Matrix ) ) {
		A = new Matrix( A )
	}
	if ( !( B instanceof Matrix ) ) {
		B = new Matrix( B )
	}
	let ii = A.row,
		array = [],
		i, k, kk;
	for ( i = 1; i <= ii; i++ ) {
		array[ i - 1 ] = [];
		kk = A.getColumn( i )
		for ( k = 1; k <= kk; k++ ) {
			a = ( typeof B._( i, k ) === 'function' ) ? B._( i, k )
				.call( {
					A: A,
					B: B
				} ) : B._( i, k );
			array[ i - 1 ][ k - 1 ] = ( typeof A._( i, k ) === 'function' ) ? A._( i, k )
				.call( {
					A: A,
					B: B
				}, a ) :
				( typeof A._( i, k ) === 'object' )  ?
				apply( A._( i, k ), a ) : A._( i, k ) * a
		}
	}
	return new Matrix( array );
}


module.exports = function ( A, B, cb ) {
	if ( cb && typeof cb === 'function' ) {
		return new Promise( function ( full, rej ) {
			try {
				full( cb.call( {
					A: A,
					B: B
				}, null, apply( A, B ) ) )
			} catch ( e ) {
				rej( cb.call( {
					A: A,
					B: B
				}, e, null ) )
			}
		} )
	} else {
		return apply( A, B );
	}
};
