'use strict'

function covMatrix( ) {
    var std = this.std( )
    var diagonal = std.diagonal( )
    return std.map( function ( item, i, j ) {
        return item / ( diagonal._( i, 1 ) * diagonal._( j, 1 ) )
    } )
}
module.exports = function ( cb ) {
    var self = this
    if ( cb && typeof cb === 'function' ) {
        return new Promise( function ( full, rej ) {
            try {
                full( cb.call( self, null, covMatrix.call( self ) ) )
            } catch ( e ) {
                rej( cb.call( self, e, null ) )
            }
        } )
    } else {
        return covMatrix.call( self );
    }
};
