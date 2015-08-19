'use strict';
/**@function
 * The function to use in the fit.
 * @param {Number} variable x, {String} nameF, {Array} equationFit.
 * @return {Function}.
 */

module.exports = function (nameF,equationFit) {
    var Fname =  {
        linear:function () {
         return  equationFit[0] + '*x+' + equationFit[1];},

         exponential:function () {
           return equationFit[0]   + '*exp(' + equationFit[1] + '*x)';},

         logarithmic: function () {
           return equationFit[0] +'+'+ equationFit[1]+'*log(x)' ;
         },

        power : function () {
          return equationFit[0]+'*x**'+equationFit[1];
        },
        polynomial: function () {
          return    equationFit[0] +'+'+ equationFit[1]+ '*x+' + equationFit[2]+'*x**2' ;
        }
    };
return Fname[nameF]() ;
};
