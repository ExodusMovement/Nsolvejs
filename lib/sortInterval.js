'use strict';
/**@function
 * This function sort a interval given.
 * @param {Array} interval.
 * @return {Array} interval sorted.
 */
module.exports = function ( interval ) {
    var a;
    if ( interval[ 1 ] < interval[ 0 ] ) {
        a = interval[ 1 ];
        interval[ 1 ] = interval[ 0 ];
        interval[ 0 ] = a;
    }
};
