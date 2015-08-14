'use strict' ;
var  matrix = require('./Matriz');
    /** @function
     * sum  the matrix object.
     * @param {Object} matrix {Object} matrix.
     *@return {Object} matrix
     */
     module.exports =  function (A,B){
       if(A instanceof matrix && B instanceof  matrix && A.column === B.column && A.raw === B.column ){
         var ii=A.raw,kk=B.column,array = [],i,k ;
         for (i=1 ;i<=ii;i++){
           array[i-1]=[];
           for (k=1 ;k<=kk;k++){
               array[i-1][k-1]=A._(i,k)+B._(i,k);
           }
         }
         return  new matrix(array);
       }
     } ;
