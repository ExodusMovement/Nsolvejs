'use strict' ;
/** @function
 * multiply the matrix object.
 * @param {Object} matrix {Object} matrix.
 * @return {Object} matrix
 */
function product(A,B){
       if (!A || !B) { return ;}
       var  Matrix = require('./Mat');
       if (!(A instanceof Matrix) && Array.isArray(A)) {A = Matrix(A)}
       if (!(B instanceof Matrix) && Array.isArray(B)) {B = Matrix(B)}
       if( A.column === B.column && A.row === B.row ){
         var ii=A.row,kk=B.column,array = [],i,k ;
         for (i=1 ;i<=ii;i++){
           array[i-1]=[];
           for (k=1 ;k<=kk;k++){
               array[i-1][k-1]= A._(i,k)*B._(i,k);
           }
         }
         var Matrix = require('./Mat');
         return  new Matrix(array);
       }
     }


     module.exports = function (A,B,cb) {
       if (cb && typeof cb === 'function') {
         setImmediate(function () {
           cb(product(A,B));
         });
       } else {
         return product(A,B);
       }
     };
