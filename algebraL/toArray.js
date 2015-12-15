'use strict';
/** @function
 * Generates a array from a object with the pattern [[key,value]]
 * @param {Object} obj.
 * @return {Array}
 */
function toArray( obj ) {
	let Matrix = require( './Mat' )
	let array = []
	for ( var variable in obj ) {
		if ( obj.hasOwnProperty( variable ) ) {
			array.push( [ variable,
				( typeof obj[ variable ] === 'object' ) && !Array.isArray( obj[ variable ] ) ?
        new toArray( obj[ variable ] ) :
        Array.isArray( obj[ variable ] ) ?
        new Matrix( obj[ variable ] ) :
        obj[ variable ]
      ] )
		}
	}
	return array
}
module.exports = toArray
