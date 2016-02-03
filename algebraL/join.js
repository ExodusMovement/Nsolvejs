'use strict';
let clone = require( '../utils/clone' )
  /** @function
   * Join  of a matrix.
   * @param {Object} matrix
   * @return {Object} matrix
   */
function join( A, B, p, t ) {
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
  let ii = B.row,
    array = clone( A.array ),
    i, k, kk;
  for ( i = 1; i <= ii; i++ ) {
    array[ i + p - 2 ] = array[ i + p - 2 ] || [ ]
    kk = B.getColumn( i )
    for ( k = 1; k <= kk; k++ ) {
      array[ i + p - 2 ][ k + t - 2 ] = B._( i, k )
    }
  }
  return new Matrix( array )
}

function addd( array ) {
  let l = array.length - 3
  for ( let p = 0; p < l; p++ ) {
    let A = array[ p ],
      B = array[ p + 1 ],
      i = array[ p + 2 ],
      j = array[ p + 3 ]
    A = join( A, B, i, j )
    return A;
  }
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
    arg.pop( );
    return new Promise( function ( full, rej ) {
      try {
        full( cb.call( null, null, addd( arg ) ) )
      } catch ( e ) {
        rej( cb.call( null, e, null ) )
      }
    } )
  } else {
    return addd( arg );
  }
};