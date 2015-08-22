'use strict';
/**@function
 * The function to use in the fit.
 * @param {Number} variable x, {String} nameF, {Array} equationFit.
 * @return {Function}.
 */

module.exports = function (x,nameF,equationFit) {
    var Fname =  {
        linear: function (x) {
          return  equationFit[0] * x + equationFit[1] ;
          } ,

         exponential:  function (x) {
            return equationFit[0] * Math.exp(equationFit[1]*x) ;
         },

         logarithmic: function (x) {
           return equationFit[0] + equationFit[1]*Math.log(x) ;
         },

        power : function (x) {
              return equationFit[0]* Math.pow(x , equationFit[1]) ;
            } ,
        polynomial: function (x) {
<<<<<<< HEAD
        return equationFit[0] + equationFit[1] * x + equationFit[2] * x * x, equationFit[3] * x * x*x+ equationFit[4] * x * x*x*x;
      }
=======
        return equationFit[0] + equationFit[1] * x + equationFit[2] * x * x;
      },
       inverse: function (x) {
       return equationFit[0]/ ( x - equationFit[1] );
     },
     sqrt: function (x) {
     return equationFit[0]*Math.sqrt(x) + equationFit[1] ;
     }
>>>>>>> dcfd44fb7a0fee39637c9bbbae232cf75099691c

    };
return Fname[nameF](x) ;
};
