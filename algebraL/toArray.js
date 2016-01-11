'use strict';
/** @function
 * Generates a array from a object with the pattern [[key,value]]
 * @param {Object} obj.
 * @return {Array}
 */
function toArray( obj, opt ) {
  opt = opt || {
    deep: true
  }
  opt.deep = opt.deep === undefined ? true : opt.deep
  let Matrix = require( './Mat' )
  let array = [ ],
    value
  for ( var variable in obj ) {
    if ( obj.hasOwnProperty( variable ) ) {
      value = ( typeof obj[ variable ] === 'object' && opt.dep ) ? new Matrix(
        obj[ variable ] ) : obj[ variable ]
      array.push( [ variable, value ] )
    }
  }
  return array
}
module.exports = toArray