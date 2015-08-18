'use strict' ;
var     det = require('./det'),
     minor = require('./minor'),
     trans = require('./trans') ;

/** @function
 * The adjunted matrix.
 * @param  {Object} matrix
 * @return {Object} matrix
 */
     module.exports = function (B){
       var  Matrix = require('./Mat');
       if (B.raw > 1) {
         if( B.raw === B.column ){
           var ii=B.raw,kk=B.column,array = [],i,k ;
           for (i=1 ;i<=ii;i++){
             array[i-1]=[];
             for (k=1 ;k<=kk;k++){
                 array[i-1][k-1]=Math.pow(-1,i+k)*det(minor(i,k,B));
             }
           }
           return trans(new Matrix(array)) ;
         }
       }
       return new Matrix([[1]]);
     } ;
