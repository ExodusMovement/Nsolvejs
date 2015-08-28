'use strict';
var  f              = require('./fitFunction'),
     betterfit      = require('./betterfit'),
     smoothingdata  = require('./smoothingdata'),
     noiseeliminatedata = require('./noise_eliminator'),
     _                  = require('underscore'),
     getx               = require('./getx'),
     gety               = require('./gety'),
     Fit                = require('./Fit'),
     setparams          = require('./setparams_bestfit'),
     fit={},array_y= [],_fit ,array_x=[],interval;
/** @function
 * This function calculate the best fit to a Array given and make
 * a calculus of second argument with get_y and first argument with
 * get_x.
 * @param {Array} arrayFit, {Array} get_y,  {Array} get_x
 * @return {Object} fit
 */
module.exports = function(_arrayFit, get_y, get_x,options,callback) {
    if(!_arrayFit){return ;}
    setparams(get_y, get_x,options,callback);
    get_x = get_x || [] ;
    get_y = get_y || [] ;
    var fits_name = options.fits_name ,
    smoothing = options.smoothing, alpha = options.alpha, smoothingmethod = options.smoothingmethod,noiseeliminate= options.noiseeliminate,
    arrayFit=[],a,b ;
    /** Is used the fit if is passed */
    if (!(_arrayFit instanceof Array)) {
      fit = _arrayFit.fit;
      arrayFit = _.clone(_arrayFit.fitPointsUsed,true) ;
      a = arrayFit[0][0] ;b =arrayFit[arrayFit.length-1][0];
    }else {
    /** If not, the fit is calculated
    *   The noise is elimanated from data.
    */
      var l = _arrayFit.length,j;
      for ( j = 0; j < l; j++) {
        arrayFit[j] = [_arrayFit[j][0],_arrayFit[j][1]] ;
      }
      a = arrayFit[0][0] ;b =arrayFit[l-1][0] ;
      if(noiseeliminate){
        arrayFit = noiseeliminatedata(arrayFit,{method :smoothingmethod, alpha : alpha});
      }
      /** The data are smoothed. */
      if(smoothing){
        arrayFit = smoothingdata(arrayFit,{method :smoothingmethod, alpha : alpha});
      }
      /** Find the best fit. */
      fit = betterfit(arrayFit,fits_name) ;
    }
    function h(x) {
     return  f(x,fit.best.name,fit[fit.best.name].regression.equation);
    }
   /** Calculate the values of "y" using get_y. */
    array_y = gety(h, get_y);
   /** Choices the best  interval to solve the equation fit(x)=get_x.*/
    if( fit.best.name !== 'logarithmic'){
      interval = [a-6*(b-a),b+6*(b-a)];
    } else {
     interval = [a<0 ? 0.01 : a,b+5*(b-a)];
    }
   var initial = b+a ;
  /** Obtain the values "x" using get_x.*/
   array_x = getx(fit.best.f,get_x, interval,initial) ;
   /** Build the fit object to return.*/
   _fit ={ ans_ofY         : array_y    ,
           ans_ofX         : array_x     ,
           fitOptions      : options    ,
           fitUsed         : fit.best.name ,
           fitEquationUsed : fit[fit.best.name].regression.string,
           fitParamsUsed   : fit[fit.best.name].regression.equation,
           fitPointsUsed   : arrayFit,
           fitWithError    : fit.best.error,
           fit              : fit
         };
          /** The callback function*/
   if (callback) {
    callback(_fit);
   }
   var fit_ =  new Fit(_fit);
   return fit_ ;
} ;
