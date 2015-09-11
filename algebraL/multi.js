'use strict' ;
var product = require('./product');

/** @function
 * multiply the matrix object.
 * @param {Object} matrix {Object} matrix.
 * @return {Object} matrix
 */
function multi (array){
  var l = array.length, A =array[0],B;
    for (var p = 1; p < l; p++){
      B = array[p];
      if(  A.column === B.raw){
      A=product(A,B)  ;
      }else{
      return ;
      }
    return A ;
}}
module.exports = function () {
  var cb = arguments[arguments.length-1];
  if (typeof cb === 'function') {
    arguments.pop();
    setTimeout(function () {
      cb(multi (arguments));
    });
  } else {
    return multi (arguments) ;
  }
};
