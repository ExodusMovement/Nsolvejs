'use strict' ;
var matrix = require('./Matriz'),
_ = require('lodash'),
product = require('./product');

/** @function
 * multiply the matrix object.
 * @param {Object} matrix {Object} matrix.
 * @return {Object} matrix
 */
module.exports= function (){
  var l = arguments.length , A = arguments[0],B;
  if (A instanceof matrix) {
    for (var p = 1; p < l; p++){
      B = arguments[p];
      if( B instanceof  matrix && A.column === B.raw){
      A=product(A,B)  ;
      }else{
      return ;
      }
    }
    return A ;
  }
} ;
