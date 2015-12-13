'use strict' ;
/** @function
 * multiply the matrix object for a scalar number.
 * @param {Number} scalar {Object} matrix.
 * @return {Object} matrix
 */
function  pscalar(alpha,B){
       if (!B) { return ;}
       var Matrix = require('./Mat');
       if (!(B instanceof Matrix)) {B = Matrix(B)}
       if (typeof alpha === 'undefined') {alpha = 1;}
       if(typeof alpha === 'number'  ){
         var ii=B.row,kk,array = [],i,k ;
         for (i=1 ;i<=ii;i++){
           array[i-1]=[];
           kk = B.getColumn(i)
           for (k=1 ;k<=kk;k++){
               array[i-1][k-1]=alpha*B._(i,k);
           }
         }
         return  new Matrix(array);
       }
     }

     module.exports = function (alpha,B,cb) {
       if (cb && typeof cb === 'function') {
         return new Promise(function(full,rej){
           try {
             full(cb(null,pscalar(alpha,B)))
           } catch (e) {
             rej(cb( e,null ) )
           }
         }
      )
       } else {
         return pscalar(alpha,B) ;
       }
     };
