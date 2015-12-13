'use strict';
var minor = require( './minor' );
/** @function
 * The determinat of matrix.
 * @param  {Object} matrix.
 * @return {Number} determinant.
 */
var det = function ( B ) {
	if ( !B ) {
		return;
	}
	var Matrix = require( './Mat' )
	if ( !( B instanceof Matrix ) ) {
		B = new Matrix( B )
	}
	var _det;
	if ( B.row >= 0 ) {
		if ( B.row > 2 ) {
			var ii = B.getColumn( 1 ),
				i, arrayminor = [];
			_det = 0;
			for ( i = 1; i <= ii; i++ ) {
				arrayminor[ i - 1 ] = minor( 1, i, B );
				_det += Math.pow( -1, 1 + i ) * det( arrayminor[ i - 1 ] ) * B._( 1, i );
			}
		} else {
			if ( B.row === 2 ) {
				_det = B._( 1, 1 ) * B._( 2, 2 ) - B._( 1, 2 ) * B._( 2, 1 );
			} else if ( B.row === 1 ) {
				_det = B._( 1, 1 );
			}
		}
		return _det;
	}

};
module.exports = function ( B, cb ) {
	if ( cb && typeof cb === 'function' ) {
		return new Promise( function ( full, rej ) {
			try {
				full( cb( null, det( B ) ) )
			} catch ( e ) {
				rej( null, cb( e ) )
			}
		} )
	} else {
		return det( B );
	}
};
