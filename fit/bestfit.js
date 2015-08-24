'use strict';
var  f = require('./fitFunction'),
     betterfit = require('./betterfit'),
     smoothingdata = require('./smoothingdata'),
     noiseeliminatedata = require('./noise_eliminator'),
     getx = require('./getx'), gety = require('./gety'),fit={},array_y= [],_fit ,array_x=[],interval;

/** @function
 * This function calculate the best fit to a Array given and make
 * a calculus of second argument with get_y and first argument with
 * get_x.
 * @param {Array} arrayFit, {Array} get_y,  {Array} get_x
 * @return {Object} fit
 */
module.exports = function(_arrayFit, get_y, get_x,options,callback) {
    if(!_arrayFit){return ;}
    if(typeof options ==='function'){callback = options ; options = undefined;}
   options = options ||
   {smoothing : false, noiseeliminate : false,
     smoothingmethod :'exponential',alpha : 0.8,
   fits_name:['linear','exponential','logarithmic','power','polynomial','inverse','sqrt']} ;
    if(options.smoothing === undefined){options.smoothing = false ;}
    if(options.noiseeliminate === undefined){options.noiseeliminate = false;}
   options.smoothingmethod = options.smoothingmethod || 'exponential' ;
   options.alpha = options.alpha || 0.8 ;
   options.fits_name = options.fits_name ||['linear','exponential','logarithmic','power','polynomial','inverse','sqrt'];
   var fits_name = options.fits_name ;
   var smoothing = options.smoothing, alpha = options.alpha, smoothingmethod = options.smoothingmethod,noiseeliminate= options.noiseeliminate,arrayFit ;
   // The noise is elimanated from data.
   if(noiseeliminate){
     _arrayFit = noiseeliminatedata(_arrayFit,{method :smoothingmethod, alpha : alpha});
   }
   // The data are smoothed.
   if(smoothing){
     _arrayFit = smoothingdata(_arrayFit,{method :smoothingmethod, alpha : alpha});
   }
   arrayFit = _arrayFit ;
   var  a = arrayFit[0][0] ,b =arrayFit[arrayFit.length-1][0] ;
   get_x = get_x || [] ;
   // Find the best fit.
   fit = betterfit(arrayFit,fits_name) ;
   function h(x) {
     return  f(x,fit.best.name,fit[fit.best.name].regression.equation);
   }
   // Calculate the values of "y" using get_y.
   array_y = gety(h, get_y);
   // Choices the best  interval to solve the equation fit(x)=get_x.
   if( fit.best.name !== 'logarithmic'){
     interval = [a-6*(b-a),b+6*(b-a)];
   } else {
     interval = [a<0 ? 0.01 : a,b+5*(b-a)];
   }
   var initial = b+a ;
  // Obtain the values "x" using get_x.
   array_x = getx(fit.best.f,get_x, interval,initial) ;
   // Build the fit object to return.
   _fit ={ ans_ofY         : array_y    ,
           ans_ofX         : array_x     ,
           fitOptions      : options    ,
           fitUsed         : fit.best.name ,
           fitEquationUsed : fit[fit.best.name].regression.string,
           fitParamsUsed   : fit[fit.best.name].regression.equation,
           fitPointsUsed   : arrayFit,
           fitWithError    : fit.best.error,
           fit             : fit
         };

   if (callback) {
    callback(_fit);
   }
   return _fit ;
} ;
