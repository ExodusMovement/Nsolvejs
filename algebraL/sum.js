'use strict' ;
    /** @function
     * sum  the matrix object.
     * @param {Object} matrix {Object} matrix.
     *@return {Object} matrix
     */

var sum =  function (A,B){
     var Y = require('./Mat');
       if( A.column === B.column && A.raw === B.raw ){
         var ii=A.raw,kk=B.column,array = [],i,k ;
         for (i=1 ;i<=ii;i++){
           array[i-1]=[];
           for (k=1 ;k<=kk;k++){
               array[i-1][k-1]=A._(i,k)+B._(i,k);
           }
         }
       return new Y(array)  ;
       }
} ;


       module.exports= function (x){
         var l = arguments.length , A=x,B,p;
           for ( p = 1; p < l; p++){
             B = arguments[p];
             A=sum(A,B)  ;
           }
         return A ;
       } ;
