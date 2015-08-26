'use strict' ;
/** @function
 * Mapping the matrix object with a function given.
 * @param {Function} map {Object} matrix.
 * @return {Object} matrix
 */
module.exports = function  (map,B){
       if (!map || !B) { return ;}
       if(typeof map === 'function'  ){
         var ii=B.raw,kk=B.column,array = [],i,k ;
         for (i=1 ;i<=ii;i++){
           array[i-1]=[];
           for (k=1 ;k<=kk;k++){
               array[i-1][k-1]=map(B._(i,k),i,k) ;
           }
         }
         var Matrix = require('./Mat');
         return  new Matrix(array);
       }
} ;
