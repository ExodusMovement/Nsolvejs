'use strict'
module.exports = function ( ) {
  // attach the .equals method to Array's prototype to call it on any array
  Object.prototype.similarly = function ( obj ) {
      // if the other array is a falsy value, return
      let keys = Object.keys( obj )
      let thisKeys = Object.keys( this )
        // Check if every object have the same number of keys
      if ( keys.length !== thisKeys.length ) {
        return false;
      }
      let index
        // Find the index of key given
      for ( var i = 0, l = thisKeys.length; i < l; i++ ) {
        index = keys.indexOf( thisKeys[ i ] )
        if ( index === -1 ) {
          return false
        }
        // Check if we have nested arrays
        if ( this[ thisKeys[ i ] ] instanceof Object && obj[ keys[ index ] ] instanceof Object ) {
          // recurse into the nested arrays
          if ( !this[ thisKeys[ i ] ].equals( obj[ keys[ index ] ] ) ) {
            return false;
          }
        } else if ( this[ thisKeys[ i ] ] !== obj[ keys[ index ] ] ) {
          // Warning - two different object instances will never be equal: {x:20} != {x:20}
          return false;
        }
        keys.splice( index, 1 )
      }
      return true;
    }
    // Hide method from for-in loops
  Object.defineProperty( Object.prototype, 'similarly', {
    enumerable: false
  } );
}