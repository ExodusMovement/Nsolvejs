'use strict' ;
var matrix = require('./Matriz'),
    dkronecker = require('./dkronecker'),
product = require('./product');

/** @function
 * multiply the matrix object.
 * @param {Object} matrix {Object} matrix.
 * @return {Object} matrix
 */
module.exports =function (A,n){
  if (A instanceof matrix && typeof n === 'number' && Math.floor(n) === n &&   A.column === A.raw) {
    var array = [],B;
    for (var i = 0; i < A.column; i++) {
      array[i]=[];
      for (var j = 0; j < A.column; j++) {
      array[i][j]=dkronecker(i,j);
      }
    }
    if (n===0) {
      return new matrix(array);
    } else if(n ===1) {
      return A ;
    }else if (n ===2){
      return product(A,A);
    }else{
      B= product(A,A);
      for ( i = 3; i < n; i++) {
      B=product(B,A);
      }
    }
  return B
  }
} ;
