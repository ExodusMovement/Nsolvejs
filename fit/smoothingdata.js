'use strict';
var log10 = require('log10');
/** @function
 * This function smoothed the datas usind the exponential and moving average method. The arraytosmoothing have to be like [[t_1,x_1],[t_2,x_2]...].
 * @param {Array} arraytosmoothing {Object} options
 * @return {Array} arraysmoothed.
 */
module.exports = function(arraytosmoothing,options  ) {
options = options || {method : 'exponential', alpha : 0.8} ;
options.method = options.method ||  'exponential';
options.alpha = options.alpha ||  0.8;
var _array = arraytosmoothing, arraysmoothed = [],method = options.method;
// Exponential method is applicated.
if(method ==='exponential'){
  var i,t,x_t,s_t_1,s_t,
  alpha = options.alpha , beta = 1-alpha,length = _array.length ;
  if (alpha > 1) { alpha = Math.pow(10,Math.floor(log10(alpha)+1));}
  arraysmoothed[0]  = [_array[0][0],_array[0][1]];
  // Define the initial condition.
  s_t_1 = _array[0][1] ;
  for ( i = 1; i < length; i++) {
      t=_array[i][0] ;
      x_t = _array[i][1] ;
      // recurrence relation in exponential method.
      s_t = alpha*x_t+beta*s_t_1;
      arraysmoothed[i]  = [t,s_t];
      s_t_1 = s_t;
  }
}
return arraysmoothed ;
} ;
