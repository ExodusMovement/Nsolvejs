'use strict';
var  f              = require('./fitFunction'),
     finv = require('./fitFunctionInv'),
     betterfit      = require('./betterfit'),
     smoothingdata  = require('./smoothingdata'),
     noiseeliminatedata = require('./noise_eliminator'),
     _                  = require('underscore'),
     getx               = require('./getx'),
     gety               = require('./gety'),
     Fit                = require('./Fit'),
     setparams          = require('./setparams_bestfit'),
     fit={},array_y= [],_fit ,array_x=[],_setparams;
/** @function
 * This function calculate the best fit to a Array given and make
 * a calculus of second argument with get_y and first argument with
 * get_x.
 * @param {Array} arrayFit, {Array} get_y,  {Array} get_x
 * @return {Object} fit
 */
module.exports = function(_arrayFit, get_y, get_x,options,callback) {
    if(!_arrayFit){return ;}
    _setparams = setparams(get_y, get_x,options,callback);
    get_x  = _setparams.get_x; get_y= _setparams.get_y ;
    options = _setparams.options; callback = _setparams.callback ;
    var fits_name = options.fits_name ,
        smoothing = options.smoothing, alpha = options.alpha, smoothingmethod = options.smoothingmethod,noiseeliminate= options.noiseeliminate,
        arrayFit=[],a,b ,using = options.using;
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
        arrayFit[j] = [ _arrayFit[j][ using[0] ], _arrayFit[j][ using[1] ] ] ;
      }
      if (l ===1) { arrayFit.unshift([0,0]); }
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
     return  f(fit.best.name,fit[fit.best.name].regression.equation)(x);
    }
    /** Calculate the values of "y" using get_y. */
    array_y = gety(h, get_y);
    /**Define the inverse function*/
    function hinv(x) {
     return  finv(fit.best.name,fit[fit.best.name].regression.equation)(x);
    }
    /** Obtain the values "x" using get_x.*/
    array_x = getx(hinv,get_x) ;
    /** Build the fit object to return.*/
    _fit ={ ans_ofY        : array_y    ,
           ans_ofX         : array_x    ,
           fitOptions      : options    ,
           fitUsed         : fit.best.name ,
           fitEquationUsed : fit[fit.best.name].regression.string,
           fitParamsUsed   : fit[fit.best.name].regression.equation,
           fitPointsUsed   : arrayFit,
           fitWithError    : fit.best.error,
           fitFunction    : fit.best.f,
           fit             : fit
    };
          /** The callback function*/
    if (callback) {
    callback(_fit);
    }
    var fit_ =  new Fit(_fit);
    return fit_ ;
} ;
