'use strict';
var sortInterval = require( './sortInterval' );
var d = require( './derivativeN' ),
    _ = require( 'lodash' );
/**@function
 * This function solve the equation f(x)=0 using the second order   Newthon-Rapshon  method. to do this calculate the numerical derivative in interval using npoints_DNumeric into options object and beginning in initialpoint.
 * @param {Function} f, {Array} interval, {Number}point_initial {Object} options.
 * @return {Object} with properties Root, steps number used and method used.
 */
function NRH( f, interval, initialpoint, options ) {
    if ( !f ) {
        return;
    }
    if ( typeof point_initial === 'object' ) {
        options = initialpoint;
        initialpoint = undefined;
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
    var x_n, x_n_1, y_n, Root, a, n, b;
    var npoints = options.npoints_DNumeric,
        df_dx, d2f_dx2;
    sortInterval( interval );
    a = interval[ 0 ];
    b = interval[ 1 ];
    // If the point_initial is not defined, is taken like a random number in the interval.
    initialpoint = initialpoint || ( b - a ) / 2;
    var D = new d.Nof( f, npoints, [ a, b ] );
    df_dx = D.f_x;
    var D2 = new d.Nof( df_dx, npoints, [ a, b ] );
    d2f_dx2 = D2.f_x;
    x_n_1 = initialpoint;
    var nmax = options.nstepsmax;
    n = 1;
    while ( !Root && n < nmax ) {
        if ( !x_n_1 || x_n_1 < a || x_n_1 > b ) {
            break;
        }
        //the second order   Newthon-Rapshon  method.
        x_n = x_n_1 - f( x_n_1 ) / df_dx( x_n_1 ) + 0.5 * ( d2f_dx2( x_n_1 ) * f( x_n_1 ) * f( x_n_1 ) ) / ( df_dx( x_n_1 ) * df_dx( x_n_1 ) * df_dx( x_n_1 ) );
        y_n = f( x_n );
        if ( Math.abs( y_n ) <= presicion ) {
            Root = x_n;
        }
        x_n_1 = x_n;
        n++;
    }
    return {
        Root: Root,
        numSteps: n,
        method: 'Newton_Raphson_Higherorder'
    };
}
/**Here we wrapper the function to maje a non-blocking*/
module.exports = function ( f, interval, initialpoint, options, cb ) {
    if ( cb && typeof cb === 'function' ) {
        return new Promise( function ( full, rej ) {
            try {
                full( cb( NRH( f, interval, initialpoint, options ) ) )
            } catch ( e ) {
                rej( cb( e, null ) )
            }
        } )
    } else {
        return NRH( f, interval, initialpoint, options )
    }
};
