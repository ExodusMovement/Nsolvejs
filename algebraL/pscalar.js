'use strict' ;
/** @function
 * multiply the matrix object for a scalar number.
 * @param {Number} scalar {Object} matrix.
 * @return {Object} matrix
 */
function  pscalar(alpha,B){
       if (!B) { return ;}
       if (typeof alpha === 'undefined') {alpha = 1;}
       if(typeof alpha === 'number'  ){
         var ii=B.raw,kk=B.column,array = [],i,k ;
         for (i=1 ;i<=ii;i++){
           array[i-1]=[];
           for (k=1 ;k<=kk;k++){
               array[i-1][k-1]=alpha*B._(i,k);
           }
         }
         var Matrix = require('./Mat');
         return  new Matrix(array);
       }
     }

     module.exports = function (alpha,B,cb) {
       if (cb && typeof cb === 'function') {
         setTimeout(function () {
           cb(pscalar(alpha,B));
         });
       } else {
         return pscalar(alpha,B) ;
       }
     };
