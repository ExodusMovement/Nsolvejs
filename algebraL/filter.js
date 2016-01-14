'use strict';
/** @function
 * Filter the matrix object with a function given.
 * @param {Function} map {Object} matrix.
 * @return {Object} matrix
 */
function filter( B, _map ) {
  let test
  if ( _map === undefined || !B ) {
    return;
  }
  let Matrix = require( './Mat' );
  if ( !( B instanceof Matrix ) ) {
    B = new Matrix( B )
  }
  let map = new Matrix( _map )
  let i, k, j = 1,
    l = 1,
    array;
  array = [ ]
  for ( i = 1; i <= B.row; i++ ) {
    array[ j - 1 ] = [ ]
    for ( k = 1; k <= B.getColumn( i ); k++ ) {
      if ( B._( i, k ) instanceof Matrix ) {
        B.array[ i - 1 ][ k - 1 ] = filter( B._( i, k ), map._( i, k ) )
      } else {
        test = typeof map._( i, k ) === 'function' ? ( map._( i, k ).call( B, B
          ._( i, k ), i, k ) ) : Boolean( map._( i, k ) )
        if ( test ) {
          array[ j - 1 ][ l - 1 ] = B._( i, k )
          l++
        }
      }
    }
    l = 1
    if ( array[ j - 1 ].length ) {
      j++;
    } else {
      array.splice( j - 1, 1 )
    }
  }
  return new Matrix( array, B.row, B._column, B.opt );
}

function addd( array ) {
  let l = array.length,
    A = array[ 0 ],
    B, p;
  for ( p = 1; p < l; p++ ) {
    B = array[ p ];
    A = filter( A, B );
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
    arg.pop( );
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