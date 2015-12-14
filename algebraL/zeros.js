'use strict';
var builder = require( './matrix_nxm' );

/** @function
 * Builder of matrix with zeros.
 * @param {Number} the length of matrix.
 * @return {Object} matrix
 */
function zeros( n, m ) {
	m = m || n
	return builder( n, m, function () {
		return 0;
	} )
}

module.exports = function ( n, m, cb ) {
	if ( cb && typeof cb === 'function' ) {
		return new Promise( function ( full, rej ) {
			try {
				full( cb( null, zeros( n, m ) ) )
			} catch ( e ) {
				rej( cb( e, null ) )
			}
		} )
	} else {
		return zeros( n, m );
	}
};
