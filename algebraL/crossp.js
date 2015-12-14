'use strict';
var levicivita = require( '../utils/levi_civita' );
/** @function
 * croos Product beetwen vectors.
 * @param {Object} vector {Object} vector.
 * @return {Object} vector
 */
function crossp( A, B ) {
	if ( !A && !B ) {
		return;
	}
	var Vector = require( './vector' );
	if ( !( A instanceof Vector ) && Array.isArray( A ) ) {
		A = Vector( A )
	}
	if ( !( B instanceof Vector ) && Array.isArray( B ) ) {
		B = Vector( B )
	}
	var i, j, k, array = [];
	for ( i = 0; i < 3; i++ ) {
		array[ i ] = 0;
		for ( j = 0; j < 3; j++ ) {
			for ( k = 0; k < 3; k++ ) {
				array[ i ] = array[ i ] + A.array[ j ][ 0 ] * B.array[ k ][ 0 ] * levicivita[ i ][ j ][ k ];
			}
		}
	}
	return new Vector( array );
}
module.exports = function ( A, B, cb ) {
	if ( cb && typeof cb === 'function' ) {
		return new Promise( function ( full, rej ) {
			try {
				full( cb.call( {
					A: A,
					B: B
				}, null, crossp( A, B ) ) )
			} catch ( e ) {
				rej( cb.call( {
					A: A,
					B: B
				}, e, null ) )
			}
		} )
	} else {
		return crossp( A, B );
	}
};
