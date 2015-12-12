'use strict' ;
/** @function
 * multiply the matrix object for a scalar number.
 * @param {Number} scalar {Object} matrix.
 * @return {Object} matrix
 */
function  pscalar(alpha,B){
       if (!B) { return ;}
       var Matrix = require('./Mat');
       if (!(B instanceof Matrix) && Array.isArray(B)) {B = Matrix(B)}
       if (typeof alpha === 'undefined') {alpha = 1;}
       if(typeof alpha === 'number'  ){
         var ii=B.row,kk=B.column,array = [],i,k ;
         for (i=1 ;i<=ii;i++){
           array[i-1]=[];
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
             rej(null,cb(e))
           }
         }
      )
       } else {
         return pscalar(alpha,B) ;
       }
     };
