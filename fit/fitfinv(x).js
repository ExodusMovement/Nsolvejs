'use strict';
/**@function
 * The inverse function to use in the fit.
 * @param {Number} variable x, {String} nameF, {Array} equationFit.
 * @return {Function}.
 */
module.exports = function (nameF, equationFit) {
  var Fname = {
    linear: '(function (x) {return   (x - ' + equationFit[1] + ')/' + equationFit[0] + ' ;}) ',
    exponential: '(function (x) {return Math.log(x/' + equationFit[0] + ')/' + equationFit[1] + ';})',
    logarithmic: '(function (x) {return Math.exp((x-' + equationFit[0] + ')/ ' + equationFit[1] + ');})',
    power: '(function (x) {return Math.pow((x/' + equationFit[0] + '),1/' + equationFit[1] + ');})',
    polynomial: '(function (x) {return  (-' + equationFit[1] + ' +Math.sqrt(' + equationFit[1] + '*' + equationFit[1] + '-4*(' + equationFit[0] + ' - x)*' + equationFit[2] + '))/(2*' + equationFit[2] + ') ;})',
    inverse: '(function (x) {return ' + equationFit[0] + '/  x +' + equationFit[1] + ';})',
    sqrt: '(function (x) {return Math.pow((x- ' + equationFit[1] + ')/' + equationFit[0] + ',2 );})'
  };
  return Fname[nameF];
};
