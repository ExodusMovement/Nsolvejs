'use strict';
/** @function
 * multiply the matrix object for a scalar number.
 * @param {Number} scalar {Object} matrix.
 * @return {Object} matrix
 */


function pscalar( alpha, B ) {
	let test = false
	if ( !B ) {
		return;
	}
	let Matrix = require( './Mat' );
	if ( !( B instanceof Matrix ) ) {
		B = new Matrix( B )
	}
	if ( typeof alpha === 'undefined' ) {
		alpha = 1;
	}
	if ( typeof alpha === 'number' ) {
		let ii = B.row,
			kk, array = [],
			i, k;
		for ( i = 1; i <= ii; i++ ) {
			array[ i - 1 ] = [];
			kk = B.getColumn( i )
			for ( k = 1; k <= kk; k++ ) {
				test = test || ( typeof B._( i, k ) === 'object' )
				if ( test ){
					array[ i - 1 ][ k - 1 ] = pscalar( alpha, B._( i, k ) )
			} else {
				array[ i - 1 ][ k - 1 ] = alpha * B._( i, k );
			}
			test = false
		}
	}
	return new Matrix( array );
}
}

module.exports = function ( alpha, B, cb ) {
	if ( cb && typeof cb === 'function' ) {
		return new Promise( function ( full, rej ) {
			try {
				full( cb.call( B, null, pscalar( alpha, B ) ) )
			} catch ( e ) {
				rej( cb.call( B, e, null ) )
			}
		} )
	} else {
		return pscalar( alpha, B );
	}
};
