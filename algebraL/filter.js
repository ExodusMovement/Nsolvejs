'use strict';
/** @function
 * Filter the matrix object with a function given.
 * @param {Function} map {Object} matrix.
 * @return {Object} matrix
 */
function countColumn( array ) {
	var res = []
	for ( let i = 0; i < array.length; i++ ) {
		res.push( array[ i ].length )
	}
	return res
}

function filter( B, _map ) {
	console.log('B antes de todo',B.array);
	let test
	if ( !_map || !B ) {
		return;
	}
	let Matrix = require( './Mat' );
	if ( !( B instanceof Matrix ) ) {
		B = new Matrix( B )
	}
	let map = new Matrix( _map )
	console.log('mappp=',map.array);
	let i, k,j=1;
	for ( i = 1; i <= B.array.length; i++ ) {
		for ( k = 1; k <= B.array[i-1].length; k++ ) {
			if ( B._( i, k ) instanceof Matrix ) {
				B.array[ i - 1 ][ k - 1 ] = filter( B._( i, k ), map )
			} else {
				test = typeof map === 'function' ? !( map._( j, k )
					.call( B, B._( i, k ), i, k ) ) : !Boolean( map._( j, k ) )
					console.log('test=',test);
				if ( test ) {
					B.array[ ( i - 1 ) % B.array.length ].splice( ( k - 1 ) % B.array[ ( i - 1 ) % B.array.length ].length, 1 )
					k = k - 1
				}
			}
			console.log('B.rray',B.array);
		}
		if ( !B.array[ i - 1 ].length ) {
			B.array.splice( i - 1, 1 )
			i=i-1
		}
		console.log('B.rray despues',B.array);
		j++;
	}
	console.log('B=',B.array);

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
