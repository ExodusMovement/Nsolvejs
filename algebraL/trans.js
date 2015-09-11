'use strict' ;
/** @function
 * transposed of a matrix.
 * @param {Object} matrix
 * @return {Object} matrix
 */
function trans(B){
        if (!B) { return ;}
         var ii=B.column,kk=B.raw,array = [],i,k ;
         for (i=1 ;i <= ii;i++){
           array[i-1]=[];
           for (k=1 ;k<=kk;k++){
               array[i-1][k-1]=B._(k,i);
           }
         }
          var Matrix = require('./Mat');
         return  new Matrix(array) ;
     }
     module.exports = function (B,cb) {
       if (cb && typeof cb === 'function') {
         setImmediate(function () {
           cb(trans(B));
         });
       } else {
         return trans(B) ;
       }
     };
