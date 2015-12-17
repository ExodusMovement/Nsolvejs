'use strict';
/** @function
 * Function iterating over elements of  matrix object with params the item and indexs.
 * @param {Function} map whose params are the item and matrix's indexs.
 */
function foreach( map, B, opt ) {
    let Matrix = require( './Mat' );
    opt = opt || {
        column: 1
    }
    opt.column = opt.column || 1
    if ( !B || !map ) {
        return;
    }
    if ( !( B instanceof Matrix ) ) {
        B = new Matrix( B )
    }
    if ( typeof map === 'function' ) {
        let ii = B.getColumn( opt.column ),
            i;
        for ( i = 1; i <= ii; i++ ) {
            map.call( B, B._( undefined, i ), i );
        }
    }
    return this
}
module.exports = function ( map, B, cb ) {
    if ( cb && typeof cb === 'function' ) {
        return new Promise( function ( full, rej ) {
            try {
                full( cb.call( B, null, foreach( map, B ) ) )
            } catch ( e ) {
                rej( cb.call( B, e, null ) )
            }
        } )
    } else {
        return foreach.call( this, map, B );
    }
};
