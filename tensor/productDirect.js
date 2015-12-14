'use strict';
/** @function
 * multiply the Tensor object.
 * @param {Object} Tensor {Object} Tensor.
 * @return {Object} Tensor
 */
function product( A, B ) {
	if ( !A || !B ) {
		return;
	}
	var Tensor = require( './create' );
	if ( !( A instanceof Tensor ) ) {
		A = new Tensor( A )
	}
	if ( !( B instanceof Tensor ) ) {
		B = new Tensor( B )
	}
	var i, ii = A._fac,
		array = []
	for ( i = 1; i <= ii; i++ ) {
		array[ i - 1 ] = A._( i ) * B._( i )
	}

	return new Tensor( array );
}
module.exports = function ( A, B, cb ) {
	if ( cb && typeof cb === 'function' ) {
		return new Promise( function ( full, rej ) {
			try {
				full( cb.call( {
					A: A,
					B: B
				}, null, product( A, B ) ) )
			} catch ( e ) {
				rej( cb.call( {
					A: A,
					B: B
				}, e, null ) )
			}
		} )
	} else {
		return product( A, B )
	}
};
