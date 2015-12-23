'use strict';
/** @function
 * multiply the matrix object.
 * @param {Object} matrix {Object} matrix.
 * @return {Object} matrix
 */
function apply( A, B ) {
    let a
    if ( !A || !B ) {
        return;
    }
    let Matrix = require( './Mat' );
    if ( !( A instanceof Matrix ) ) {
        A = new Matrix( A )
    }
    if ( !( B instanceof Matrix ) ) {
        B = new Matrix( B )
    }
    let ii = A.row,
        array = [ ],
        i, k, kk;
    for ( i = 1; i <= ii; i++ ) {
        array[ i - 1 ] = [ ];
        kk = A.getColumn( i )
        for ( k = 1; k <= kk; k++ ) {
            array[ i - 1 ][ k - 1 ] = ( typeof A._( i, k ) === 'function' ) ? A
                ._( i, k ).call( {
                    A: A,
                    B: B
                }, B( undefined, i ) ) : ( typeof A._( i, k ) === 'object' ) ?
                apply( A._( i, k ), B( undefined, i ) ) : B( undefined, i ).x(
                    A._( i, k ) )
        }
    }
    return new Matrix( array );
}

function addd( array ) {
    let l = array.length,
        A = array[ 0 ],
        B, p;
    for ( p = 1; p < l; p++ ) {
        B = array[ p ];
        A = apply( A, B );
    }
    return A;
}
module.exports = function ( arg ) {
    if ( arg === undefined ) {
        return
    }
    if ( arguments.length > 1 ) {
        arg = Array.prototype.slice.call( arguments )
    }
    let cb = arg[ arg.length - 1 ];
    if ( cb && typeof cb === 'function' ) {
        return new Promise( function ( full, rej ) {
            try {
                full( cb.call( this, null, addd( arg ) ) )
            } catch ( e ) {
                rej( cb.call( this, e, null ) )
            }
        } )
    } else {
        return addd( arg );
    }
};
