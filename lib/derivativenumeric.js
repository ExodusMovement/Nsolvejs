'use strict' ;
var deltax = require('./deltax'),
    sortInterval = require('./sortInterval');

    /** @function
     * function that calculate the array of numeric derivative of f(x) using npoints in interval ([a,b]) using pointsDistribution.
     * @param {Function} f {Number} npoints {Array} interval {String} pointsDistribution.
     * @return {Array} with points (x_i,yprime_i).
     */
module.exports =  function (f,npoints,interval, pointsDistribution) {
    var  x_n ,xpoints , h, a ,b , N, y_a, y_b,i, y_n, n, x_n_1, y_n_1 , df_dx = [];
    pointsDistribution = pointsDistribution || 'linear' ;
    sortInterval(interval) ;
    xpoints = deltax(npoints,interval, pointsDistribution).x_n_array ;
    N     = npoints ;
    a     = interval[0] ;
    b     = interval[1] ;
    y_a   = f(a) ;
    y_b   = f(b) ;
    x_n_1 = a ;
    y_n_1 = y_a ;
    n     = N-1 ;
    for ( i = 0; i <= n; i++ ) {
      x_n = xpoints[i+1] ;
      y_n = f(x_n) ;
      h   = x_n - x_n_1;
      h = h || 0.000000001 ;
      df_dx[ i ] = [] ;
      df_dx[ i ]= [  x_n  ,( y_n - y_n_1 ) / h ];
      df_dx[ i ][1] =   df_dx[ i ][1] || 0.0000000001 ;
      x_n_1     = x_n ;
      y_n_1     = y_n ;
    }
    return {dfdx_array               : df_dx        ,
            pointsdistribution : pointsDistribution           } ;
};
