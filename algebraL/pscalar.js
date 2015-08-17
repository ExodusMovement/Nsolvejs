'use strict' ;


/** @function
 * multiply the matrix object for a scalar number.
 * @param {Number} scalar {Object} matrix.
 * @return {Object} matrix
 */
     module.exports = function  (alpha,B){
       if(typeof alpha === 'number'  ){
         var ii=B.raw,kk=B.column,array = [],i,k ;
         for (i=1 ;i<=ii;i++){
           array[i-1]=[];
           for (k=1 ;k<=kk;k++){
               array[i-1][k-1]=alpha*B._(i,k);
           }
         }
         var matrix = require('./Mat');
         return  new matrix(array);
       }
     } ;
