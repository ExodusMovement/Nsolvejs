'use strict'
module.exports = function ( ) {
  // attach the .equals method to Array's prototype to call it on any array
  Object.prototype.equals = function ( obj ) {
      // if the other array is a falsy value, return
      let keys = Object.keys( obj )
      let thisKeys = Object.keys( this )
        // Check if every object have the same number of keys
      if ( keys.length !== thisKeys.length ) {
        return false;
      }
      // Find the index of key given
      for ( var i = 0, l = thisKeys.length; i < l; i++ ) {
        // Check if we have nested objects
        if ( this[ thisKeys[ i ] ] instanceof Object && obj[ keys[ i ] ] instanceof Object ) {
          // recurse into the nested objects
          if ( !this[ thisKeys[ i ] ].equals( obj[ keys[ i ] ] ) ) {
            return false;
          }
        } else if ( this[ thisKeys[ i ] ] !== obj[ keys[ i ] ] ) {
          // Warning - two different object instances will never be equal: {x:20} != {x:20}
          return false;
        }
      }
      return true;
    }
    // Hide method from for-in loops
  Object.defineProperty( Object.prototype, 'equals', {
    enumerable: false
  } );
}