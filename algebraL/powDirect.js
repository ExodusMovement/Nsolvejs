'use strict' ;
var
dkronecker = require('../utils/dkronecker'),
product = require('./productDirect');

/** @function
 * multiply the matrix object.
 * @param {Object} matrix {Object} matrix.
 * @return {Object} matrix
 */
function pow(A,n){
  var Matrix = require('./Mat');
  if (!A) { return ;}
    if (!(A instanceof Matrix)) {A = new Matrix(A)}
  if ( typeof n === 'number' && Math.floor(n) === n ) {
    var array = [],B;
    for (var i = 0; i < A.row; i++) {
      array[i]=[];
      for (var j = 0; j < A.getColumn(i+1); j++) {
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
    return new Promise(function(full,rej){
      try {
        full(cb(null,pow(A,n)))
      } catch (e) {
        rej(cb( e,null ) )
      }
    }
 )
  } else {
    return pow(A,n) ;
  }
};
