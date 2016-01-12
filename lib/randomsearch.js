'use strict';
var _ = {}
_.clone = require( '../utils/clone' );
var length, random_position, position, random_position;
/**@function
 * Search a values into the arraytosearch, returnin the position where was found.
 * @param {Number} search {Array} arraytosearch.
 * @return {Object} with properties position and search made.
 */
module.exports = function ( search, arraytosearch ) {
  var array_to_search = _.clone( arraytosearch, true ),
    found;
  length = array_to_search.length;
  found = false;
  while ( !found ) {
    random_position = Math.floor( Math.random( ) * length );
    if ( array_to_search[ random_position ] <= search && search <=
      array_to_search[ random_position + 1 ] ) {
      found = true;
      position = random_position;
    }
  }
  return {
    position: position,
    search: search
  };
};