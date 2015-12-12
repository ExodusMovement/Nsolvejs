'use strict' ;
var product = require('./product');

/** @function
 * multiply the matrix object.
 * @param {Object} matrix {Object} matrix.
 * @return {Object} matrix
 */
function multi (array){
  var  Matrix = require('./Mat');
  var l = array.length, A =array[0],B;
  if (!(A instanceof Matrix)) {A = Matrix(A)}
    for (var p = 1; p < l; p++){
      B = array[p];
      if (!(B instanceof Matrix)) {B = Matrix(B)}
      return product(A,B)  ;

}}


module.exports = function () {
  var arg= Array.prototype.slice.call(arguments);
  var cb = arguments[arguments.length-1];
  if (typeof cb === 'function') {
    arg.pop();
    return new Promise(function(full,rej){
      try {
        full(cb(null,multi(arg)))
      } catch (e) {
        rej(null,cb(e))
      }
    }
 )
  } else {
    return multi(arg) ;
  }
};
