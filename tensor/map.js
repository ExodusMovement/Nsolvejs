'use strict';
/** @function
 * Mapping the Tensor object with a function given.
 * @param {Function} map {Object} Tensor.
 * @return {Object} Tensor
 */
function mapp( map, B ) {
	if ( !map || !B ) {
		return;
	}
	var Tensor = require( './create' );
	if ( !( B instanceof Tensor ) ) {
		B = new Tensor( B )
	}
	if ( typeof map === 'function' ) {
		var i, ii = B._fac,
			array = []
		for ( i = 1; i <= ii; i++ ) {
			array[ i - 1 ] = map.call( B, B._( i ), i )
		}
		return new Tensor( array );
	}

}
module.exports = function ( map, B, cb ) {
	if ( cb && typeof cb === 'function' ) {
		return new Promise( function ( full, rej ) {
			try {
				full( cb.call( B, null, mapp( map, B ) ) )
			} catch ( e ) {
				rej( cb.call( B, e, null ) )
			}
		} )
	} else {
		return mapp( map, B );
	}
};
