'use strict';
var sortInterval = require( './sortInterval' );
/** @function
 * function that calculate the array of numeric derivative of f(x) using npoints in interval ([a,b]) using a method optimized to calculate x_i.
 * @param {Function} f {Number} npoints {Array} interval {String} pointsDistribution.
 * @return {Array} with points (x_i,yprime_i).
 */
module.exports = function ( f, npoints, interval ) {
    var x_n, h, h_n, a, b, N, y_a, y_b, y_n, n,
        x_pts = [ ],
        x_n_1, y_n_1, df_dx = [ ];
    sortInterval( interval );
    N = npoints;
    a = interval[ 0 ];
    b = interval[ 1 ];
    y_a = f( a );
    y_b = f( b );
    x_n_1 = a;
    y_n_1 = y_a;
    h = ( b - a ) / N;
    h_n = h;
    n = 0;
    while ( x_n_1 < b ) {
        x_pts[ n ] = x_n_1;
        x_n = x_n_1 + h_n;
        y_n = f( x_n );
        df_dx[ n ] = [ ];
        df_dx[ n ] = [ x_n, ( y_n - y_n_1 ) / h_n ];
        x_n_1 = x_n;
        y_n_1 = y_n;
        // h_n is calculated from the condition deltax^2+deltay^2=h^2 with
        // h=(b-a)/N.
        h_n = h / Math.sqrt( 1 + df_dx[ n ][ 1 ] );
        n++;
    }
    return {
        dfdx_array: df_dx,
        xpoints: x_pts
    };
};
