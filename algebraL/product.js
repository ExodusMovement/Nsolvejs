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
       if( A.column === B.raw){
         var ii=A.raw,jj=A.column,kk=B.column,array = [],i,j,k ;
         for (i=1 ;i<=ii;i++){
           array[i-1]=[];
           for (k=1 ;k<=kk;k++){
             array[i-1][k-1]=0 ;
             for (j=1 ;j<=jj;j++){
               array[i-1][k-1]+= A._(i,j)*B._(j,k);
             }
           }
         }
         return  new Matrix(array);
       }
     }

     module.exports = function (A,B,cb) {
       if (cb && typeof cb === 'function') {
         return new Promise(function(full,rej){
           try {
             full(cb(null,product(A,B)))
           } catch (e) {
             rej(cb(e))
           }
         }
      )
       } else {
         return product(A,B) ;
       }
     };
