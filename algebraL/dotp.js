'use strict';
/** @function
 * Dot Product beetwen vectors.
 * @param {Object} vector {Object} vector.
 * @return {Number} dot product
 */
function dot( A, B ) {
    if ( !A && !B ) {
        return;
    }
    let Vector = require( './vector' );
    if ( !( A instanceof Vector ) ) {
        A = new Vector( A )
    }
    if ( !( B instanceof Vector ) ) {
        B = new Vector( B )
    }
    return A.matrix.trans( ).x( B.matrix ).array[ 0 ][ 0 ];
}
module.exports = function ( A, B, cb ) {
    if ( cb && typeof cb === 'function' ) {
        return new Promise( function ( full, rej ) {
            try {
                full( cb.call( {
                    A: A,
                    B: B
                }, null, dot( A, B ) ) )
            } catch ( e ) {
                rej( cb.call( {
                    A: A,
                    B: B
                }, e, null ) )
            }
        } )
    } else {
        return dot( A, B );
    }
};
