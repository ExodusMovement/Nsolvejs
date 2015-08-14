'use strict' ;
var
     matrix = require('./Matriz');
/** @function
 * transposed of a matrix.
 * @param {Object} matrix
 * @return {Object} matrix
 */
      module.exports =  function (B){
       if(B instanceof  matrix ){
         var ii=B.column,kk=B.raw,array = [],i,k ;
         for (i=1 ;i<=ii;i++){
           array[i-1]=[];
           for (k=1 ;k<=kk;k++){
               array[i-1][k-1]=B._(k,i);
           }
         }
         return  new matrix(array);
       }
     } ;
