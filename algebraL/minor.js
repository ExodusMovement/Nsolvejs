'use strict';
let _ = require( 'lodash' );
/** @function
 * The minor m,n of matrix.
 * @param {Number} m  {Number} n  {Object} matrix
 * @return {Object} matrix
 */
function minor( m, n, B ) {
    let Matrix = require( './Mat' );
    if ( !( B instanceof Matrix ) ) {
        B = Matrix( B )
    }
    if ( !m || !m || !B ) {
        return;
    }
    if ( typeof m === 'number' && typeof n === 'number' && 0 < m && 0 < n ) {
        let ii = B.row,
            array, i;
        array = _.clone( B.array, true );
        for ( i = 1; i <= ii; i++ ) {
            array[ i - 1 ].splice( n - 1, 1 );
        }
        array.splice( m - 1, 1 );
        return new Matrix( array );
    }
}
module.exports = function ( m, n, B, cb ) {
    if ( cb && typeof cb === 'function' ) {
        return new Promise( function ( full, rej ) {
            try {
                full( cb.call( B, null, minor( m, n, B ) ) )
            } catch ( e ) {
                rej( cb.call( B, e, null ) )
            }
        } )
    } else {
        return minor( m, n, B );
    }
};
