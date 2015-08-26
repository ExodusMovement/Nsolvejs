'use strict' ;
/** @function
 * multiply the matrix object.
 * @param {Object} matrix {Object} matrix.
 * @return {Object} matrix
 */
 module.exports = function (A,B){
       if (!A || !B) { return ;}
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
         var Matrix = require('./Mat');
         return  new Matrix(array);
       }
     } ;
