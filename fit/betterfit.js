'use strict';
var regression = require('regression'),
             _ = require('lodash'),
             f = require('./fitFunction'),
 fits_name, i ,j,fit={},x ,array_Cloned , length ,
 error = 0, best_fit='', best_fit_error,
 length_namefit;


fits_name = ['linear','exponential','logarithmic','power','polynomial'];
/** @function
 * This function calculate the best fit.
 * @param {Array} array_tofit
 * @return {Object} Best fit
 */

module.exports= function(array_tofit) {
  length_namefit = fits_name.length ;
  array_Cloned   = _.clone(array_tofit,true) ;
  length         = array_tofit.length -1 ;
  best_fit       = fits_name[0];
  best_fit_error = 0 ;
  // Calculate the regression to every method available.
  for ( i = 0 ; i < length_namefit ; i++){
    fit[fits_name[i]] = {regression : regression(fits_name[i],array_Cloned,4)}  ;
    error = 0 ;
// Calculate the error and find the best fit minimizing  error.
    for ( j = 0 ; j < length ; j++){
        x     = array_tofit[j][0] ;
        error = error +
        ( array_tofit[j][1]  - f(x,fits_name[i],fit[fits_name[i]].regression.equation)  )*
        ( array_tofit[j][1]  - f(x,fits_name[i],fit[fits_name[i]].regression.equation)  );
    }
    error = Math.sqrt(error/length) ;
    fit[fits_name[i]].error = error ;
    if(best_fit_error === 0){ best_fit_error = error ;}
    if(error < best_fit_error){ best_fit = fits_name[i]; best_fit_error = error; }
  }
  // Define the best fit found.
fit.best = { name :best_fit,
             error: best_fit_error,
             f : function (x) {
               return f(x,best_fit,fit[best_fit].regression.equation) ;
             }};
return fit ;
};
