'use strict';
/** @function
 * Filter the matrix object with a function given.
 * @param {Function} map {Object} matrix.
 * @return {Object} matrix
 */
function filter( _B, _map ) {
  let test
  if ( _map === undefined || !_B ) {
    return;
  }
  let Matrix = require( './Mat' );
  if ( !( _B instanceof Matrix ) ) {
    _B = new Matrix( _B )
  }
  let B = _B.trans( )
  let map = new Matrix( _map )
  let i, k, array, kk;
  array = [ ]
  for ( i = 1; i <= map.row; i++ ) {
    array[ i - 1 ] = [ ]
    kk = B.getColumn( map._( i, 1 ) )
    for ( k = 1; k <= kk; k++ ) {
      if ( B._( i, k ) instanceof Matrix ) {
        B.array[ i - 1 ][ k - 1 ] = filter( B._( i, k ), map._( i, 1 ) )
      } else {
        test = typeof map._( i, 1 ) === 'function' ? ( map._( i, 1 ).call( B, B
          ._( i, k ), i ) ) : map._( i, 1 )
        array[ i - 1 ][ k - 1 ] = B._( test, k )
      }
    }
  }
  return Matrix( array, map.row, B._column, B.opt ).trans( );
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