'use strict';
var sortInterval = require( './sortInterval' );
var D = require( './derivativeN' ),
    _ = require( 'lodash' );
/**@function
 * This function solve the equation f(x)=0 using the Newthon-Rapshon method.
 * @param {Function} f, {Array} interval, {Number}point_initial {Object} options.
 * @return {Object} with properties Root, steps number used and method used.
 */
function NR( f, interval, point_initial, options ) {
    if ( !f ) {
        return;
    }
    if ( typeof point_initial === 'object' ) {
        options = point_initial;
        point_initial = undefined;
    }
    options = options || {
        npoints_DNumeric: 100000,
        presicion: 0.001,
        nstepsmax: 100000
    };
    options.presicion = options.presicion || 0.001;
    options.npoints_DNumeric = options.npoints_DNumeric || 100000;
    options.nstepsmax = options.nstepsmax || 100000;
    interval = _.clone( interval, true );
    var presicion = options.presicion;
    var x_n, x_n_1, y_n, Root, a, b, n,
        npoints = options.npoints_DNumeric,
        df_dx, y_n_1, yprime_n_1;
    sortInterval( interval );
    a = interval[ 0 ];
    b = interval[ 1 ];
    // Calculate the derivative of f(x).
    var DNof = new D.Nof( f, npoints, [ a, b ] );
    df_dx = DNof.f_x;
    // If the point_initial is not defined, is taken like a random number in the interval.
    point_initial = point_initial || ( b - a ) / 2;
    x_n_1 = point_initial;
    var nmax = options.nstepsmax;
    n = 1;
    while ( !Root && n < nmax ) {
        n++;
        y_n_1 = f( x_n_1 );
        yprime_n_1 = df_dx( x_n_1 );
        // Newthon-Rapshon method.
        x_n = x_n_1 - y_n_1 / yprime_n_1;
        if ( !x_n || x_n < a || x_n > b ) {
            break;
        }
        y_n = f( x_n );
        if ( Math.abs( y_n ) <= presicion ) {
            Root = x_n;
        }
        x_n_1 = x_n;
    }
    return {
        Root: Root,
        numSteps: n,
        method: 'Newton_Raphson'
    };
}
/**Here we wrapper the function to maje a non-blocking*/
module.exports = function ( f, interval, point_initial, options, cb ) {
    if ( cb && typeof cb === 'function' ) {
        return new Promise( function ( full, rej ) {
            try {
                full( cb( NR( f, interval, point_initial, options ) ) )
            } catch ( e ) {
                rej( cb( e, null ) )
            }
        } )
    } else {
        return NR( f, interval, point_initial, options )
    }
};
