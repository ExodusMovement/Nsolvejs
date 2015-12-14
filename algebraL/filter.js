'use strict';
/** @function
 * Filter the matrix object with a function given.
 * @param {Function} map {Object} matrix.
 * @return {Object} matrix
 */
function filter( B, _map ) {
	let test
	if ( !_map || !B ) {
		return;
	}
	let Matrix = require( './Mat' );
	if ( !( B instanceof Matrix ) ) {
		B = new Matrix( B )
	}
	let map = new Matrix( _map )
	let ii = B.row,
		kk,
		i, k;
	for ( i = 1; i <= ii; i++ ) {
		kk = B.getColumn( i )
		for ( k = 1; k <= kk; k++ ) {
			test = typeof map === 'function' ? !( map._(i,k).call( B, B._( i, k ), i, k ) ) : Boolean( map._( i, k ) )
			if ( !test ) {
				B.array[ ( i - 1 ) % B.array.length ].splice( ( k - 1 ) % B.array[ ( i - 1 ) % B.array.length ].length, 1 )
			}
		}
	}
	return B;

}
module.exports = function ( map, B, cb ) {
	if ( cb && typeof cb === 'function' ) {
		return new Promise( function ( full, rej ) {
			try {
				full( cb.call( B, null, filter( map, B ) ) )
			} catch ( e ) {
				rej( cb.call( B, e, null ) )
			}
		} )
	} else {
		return filter( map, B );
	}
};
