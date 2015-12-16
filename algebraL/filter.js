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
	let i, k,j=1,l=1,array;
	array = []
	for ( i = 1; i <= B.row; i++) {
		array [j-1] =[]
		for ( k = 1; k <= B.getColumn(i); k++ ) {
			if ( B._( i, k ) instanceof Matrix ) {
				B.array[ i - 1 ][ k - 1 ] = filter( B._( i, k ), map )
			} else {
				test = typeof map === 'function' ? ( map._( i, k )
					.call( B, B._( i, k ), i, k ) ) : Boolean( map._( i, k ) )
				if ( test ) {
					array[j-1][l-1] = B._(i,k)
					l++
				}
			}
		}
		l=1
		if ( array[ j - 1 ].length ) {
			j++;
		}else {
			array.splice(j-1,1)
		}

	}
	return  Matrix(array,B.row,B._column, B.opt);

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
