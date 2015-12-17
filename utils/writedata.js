'use strict';
var fs = require( 'fs' );
/** @function
 * Writing the array given into the file of path.
 * @param {String} path {Array} data to be saved..
 */
var writeFile = function ( path, array ) {
    fs.writeFileSync( path, '\n' );
    array.forEach( function ( item ) {
        if ( item[ 0 ] && item[ 1 ] ) {
            fs.appendFileSync( path, item[ 0 ].toString( ) + ' ' + item[ 1 ] + '\n' );
        }
    } );
};
module.exports = writeFile;
