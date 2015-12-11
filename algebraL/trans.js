'use strict' ;
/** @function
 * transposed of a matrix.
 * @param {Object} matrix
 * @return {Object} matrix
 */
function trans(B){
        if (!B) { return ;}
        var Matrix = require('./Mat');
        if (!(B instanceof Matrix) && Array.isArray(B)) {B = Matrix(B)}
         var ii=B.column,kk=B.row,array = [],i,k ;
         for (i=1 ;i <= ii;i++){
           array[i-1]=[];
           for (k=1 ;k<=kk;k++){
               array[i-1][k-1]=B._(k,i);
           }
         }
         return  new Matrix(array) ;
     }
     module.exports = function (B,cb) {
       if (cb && typeof cb === 'function') {
         return new Promise(function(full,rej){
           try {
             full(cb(null,trans(B)))
           } catch (e) {
             rej(cb(e))
           }
         }
      )
       } else {
         return trans(B) ;
       }
     };
