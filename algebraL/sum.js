'use strict' ;
    /** @function
     * sum  the matrix object.
     * @param {Object} matrix {Object} matrix.
     *@return {Object} matrix
     */

var sum =  function (A,B){
     if (!A || !B) { return ;}
     var Matrix = require('./Mat');
     if (!(B instanceof Matrix)) {B =new Matrix(B)}
     if (!(A instanceof Matrix)) {A =new Matrix(A)}

         var ii=A.row,array = [],i,k,kk ;
         for (i=1 ;i<=ii;i++){
           array[i-1]=[];
           kk = B.getColumn(i)
           for (k=1 ;k<=kk;k++){
               array[i-1][k-1]=A._(i,k)+B._(i,k);
           }
         }
       return new Matrix(array)  ;

} ;
      function addd(array){
         var l = array.length , A=array[0],B,p;
           for ( p = 1; p < l; p++){
             B = array[p];
             A=sum(A,B) ;
           }
        return A ;
       }


       module.exports = function () {
         var arg= Array.prototype.slice.call(arguments);
         var cb = arguments[arguments.length-1];
         if (cb && typeof cb === 'function') {
           arg.pop();
           return new Promise(function(full,rej){
             try {
               full(cb(null,addd(arg)))
             } catch (e) {
               rej(cb( e,null ) )
             }
           }
        )
         } else {
           return addd(arg) ;
         }
       };
