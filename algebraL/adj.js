'use strict' ;
var  matrix = require('./Matriz'),
     Det = require('./det'),
     Minor = require('./minor'),
     Trans = require('./trans') ;

/** @function
 * The adjunted matrix.
 * @param  {Object} matrix
 * @return {Object} matrix
 */
     module.exports = function (B){
       if(B instanceof  matrix && B.raw === B.column ){
         var ii=B.raw,kk=B.column,array = [],i,k ;
         for (i=1 ;i<=ii;i++){
           array[i-1]=[];
           for (k=1 ;k<=kk;k++){
               array[i-1][k-1]=Math.pow(-1,i+k)*Det( Minor(i,k,B) );
           }
         }
         return  Trans(new matrix(array));
       }
     } ;