'use strict' ;
  /** @function
   * function that found the root of equation g(x)=0 by the method fixed point. To do that define, the previous equation is equivalent  to g(x)+x=x.
   * @param {Function} g  {Number}point_initial {Object}        options.
   * @return {Object} solution with properties Root found, numSteps and method's name used.
   */
function fixedpoint(g,point_initial ,options) {
    if(!g){return ;}
    if ( point_initial instanceof  Array) {point_initial =(point_initial[0]+point_initial[1])/2 ; options = arguments[3] ;     }
  // Because of this method is very fast to converge but little effective, the nstepsmax is set to only 10 steps.
         options = options || { presicion : 0.001 , nstepsmax : 100 } ;
         var presicion = options.presicion ,
          x , pivot = 0;
         function f(x) {
           return x + g(x);
         }
         x = point_initial  ;
         var Root ,
         nmax = options.nstepsmax ,
         n = 1 ;

         while (!Root && n < nmax && x !== Infinity) {
         pivot = x ;
         x = f(pivot) ;
         if (Math.abs( x - pivot ) <= presicion){ Root = x ; }
         n++ ;
         }

    return {Root : Root, numSteps : n , method : 'fixedpoint' } ;
}
/**Here we wrapper the function to maje a non-blocking*/
module.exports = function (g,point_initial ,options,cb){
  if (cb && typeof cb === 'function') {
    return new Promise(function(full,rej){
      try {
        full(  cb(fixedpoint(g,point_initial ,options)))
      } catch (e) {
        rej(null,cb(e))
      }
    }
 )
  } else {
    return   fixedpoint(g,point_initial ,options)
  }
};
