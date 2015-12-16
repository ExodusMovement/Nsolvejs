'use strict';
/** @function
 * Builder of matrix with zeros.
 * @param {Number} the length of matrix.
 * @return {Object} matrix
 */
function zeros( n, m ) {
	var builder = require( './Mat' );
	m = m || n
	return builder(0 ,n, m)
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
