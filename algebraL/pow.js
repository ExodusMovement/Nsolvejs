'use strict' ;
var
    dkronecker = require('../utils/dkronecker'),
product = require('./product');

/** @function
 * multiply the matrix object.
 * @param {Object} matrix {Object} matrix.
 * @return {Object} matrix
 */
function pow(A,n){
  var Matrix = require('./Mat');
  if (!A) { return ;}
  if ( typeof n === 'number' && Math.floor(n) === n &&   A.column === A.raw) {
    var array = [],B;
    for (var i = 0; i < A.column; i++) {
      array[i]=[];
      for (var j = 0; j < A.column; j++) {
      array[i][j]=dkronecker(i,j);
      }
    }
    if (n===0 || !n) {
      return new Matrix(array);
    } else if(n ===1) {
      return A ;
    }else if (n ===2){
      return product(A,A);
    }else{
      B= product(A,A);
      for ( i = 3; i <= n; i++) {
      B=product(B,A);
      }
    }
  return B;
  }
}

module.exports = function (A,n,cb) {
  if (cb && typeof cb === 'function') {
    setTimeout(function () {
      cb(pow(A,n));
    });
  } else {
    return pow(A,n) ;
  }
};
