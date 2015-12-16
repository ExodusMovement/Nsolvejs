'use strict';
/** @function
 * Filter the matrix object with a function given.
 * @param {Function} map {Object} matrix.
 * @return {Object} matrix
 */

function filter( _B, _map ) {
	let test
	if ( !_map || !_B ) {
		return;
	}
	let Matrix = require( './Mat' );
	if ( !( _B instanceof Matrix ) ) {
		_B = new Matrix( _B )
	}
	let B = _B.trans()
	let map = new Matrix( _map )
	let i, k,array,kk;
	array = []
	for ( i = 1; i <= map.row; i++) {
		array [i-1] =[]
		kk=B.getColumn( map._( i, 1))
		for ( k = 1; k <= kk; k++ ) {
			if ( B._( i, k ) instanceof Matrix ) {
				B.array[ i - 1 ][ k - 1 ] = filter( B._( i, k ), map._( i, 1) )
			} else {
				test = typeof map._( i, 1 ) === 'function' ? ( map._( i, 1 )
					.call( B, B._( i, k ), i ) ) : map._( i, 1 )

				array[i-1][k-1] = B._(test,k)
			}
		}
	}

	return   Matrix(array,map.row,B._column, B.opt).trans();

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
