'use strict' ;
    /** @function
     * sum  the matrix object.
     * @param {Object} matrix {Object} matrix.
     *@return {Object} matrix
     */

var sum =  function (A,B){
         var Y = require('./Mat');
       if( A.column == B.column && A.raw == B.column ){
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


       module.exports= function (){
         var l = arguments.length , A = arguments[0],B;
           for (var p = 1; p < l; p++){
             B = arguments[p];
             if(  A.column === B.raw){
             A=sum(A,B)  ;
             }else{
             return ;
             }
           }
           return A ;
       } ;
