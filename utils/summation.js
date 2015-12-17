'use strict';

function sum( j, n, map ) {
    var _sum = 0;
    for ( var i = j; i <= n; i++ ) {
        _sum += map( i );
    }
    return _sum;
}
module.exports = function ( j, n, map, cb ) {
    if ( cb && typeof cb === 'function' ) {
        setImmediate( function ( ) {
            cb( sum( j, n, map ) );
        } );
    } else {
        return sum( j, n, map );
    }
};
