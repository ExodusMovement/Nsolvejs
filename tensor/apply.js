'use strict';
/** @function
 * apply the Tensor object.
 * @param {Object} Tensor {Object} Tensor.
 * @return {Object} Tensor
 */
function apply( A, B ) {
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
		a, array = []
	for ( i = 1; i <= ii; i++ ) {
		a = ( typeof B._( i ) === 'function' ) ? B._( i )() : B._( i );
		array[ i - 1 ] = ( typeof A._( i ) === 'function' ) ? A._( i )( a ) : A._( i ) * a;
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
