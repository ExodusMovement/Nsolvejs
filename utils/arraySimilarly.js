'use strict'
module.exports = function ( ) {
  Array.prototype.indexOfItem = function ( item ) {
      for ( var i = 0, l = this.length; i < l; i++ ) {
        // Check if we have nested object
        if ( item instanceof Array ) {
          // recurse into the nested object
          if ( item.similarly( this[ i ] ) ) {
            return i;
          }
        } else if ( this[ i ] === item ) {
          // Warning - two different object instances will never be equal: {x:20} != {x:20}
          return i;
        }
      }
      return -1
    }
    // Hide method from for-in loops
  Object.defineProperty( Array.prototype, 'indexOfItem', {
    enumerable: false
  } );
  // attach the .similarly method to Object's prototype to call it on any object
  Array.prototype.similarly = function ( array ) {
      let keys = Array.from( array )
        // Check if every object have the same number of keys
      if ( this.length !== keys.length ) {
        return false;
      }
      let index
        // Find the index of key given
      for ( var i = 0, l = this.length; i < l; i++ ) {
        index = keys.indexOfItem( this[ i ] )
        if ( index === -1 ) {
          return false
        }
        // Check if we have nested arrays
        if ( this[ i ] instanceof Array && keys[ index ] instanceof Array ) {
          // recurse into the nested arrays
          if ( !this[ i ].similarly( keys[ index ] ) ) {
            return false;
          }
        } else if ( this[ i ] !== keys[ index ] ) {
          // Warning - two different object instances will never be equal: {x:20} != {x:20}
          return false;
        }
        keys.splice( index, 1 )
      }
      return true;
    }
    // Hide method from for-in loops
  Object.defineProperty( Array.prototype, 'similarly', {
    enumerable: false
  } );
}