'use strict';
/** @function
 * Builder of matrix with ones.
 * @param {Number} the length of matrix.
 * @return {Object} matrix
 */
function ones( n, m ) {
	let builder = require( './Mat' );
	m = m || n
	return builder(1, n, m );
}
module.exports = function ( n, m, cb ) {
	if ( cb && typeof cb === 'function' ) {
		return new Promise( function ( full, rej ) {
			try {
				full( cb.call( this, null, ones( n, m ) ) )
			} catch ( e ) {
				rej( cb.call( this, e, null ) )
			}
		} )
	} else {
		return ones( n, m );
	}
};
