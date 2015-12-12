'use strict' ;
/** @function
 * diagonal of a matrix.
 * @param {Object} matrix
 * @return {Object} matrix
 */
function diagonal(B){
        if (!B) { return ;}
        var Matrix = require('./Mat');
        if (!(B instanceof Matrix)) {B =new  Matrix(B)}
         var ii= B.row> B.getColumn(1) ? B.getColumn(1) : B.row,
         array = [],i ;
         for (i=1 ;i <= ii;i++){
           array[i-1]=[B._(i,i)];
         }
         return  new Matrix(array) ;
     }
     module.exports = function (B,cb) {
       if (cb && typeof cb === 'function') {
         return new Promise(function(full,rej){
           try {
             full(cb(null,diagonal(B)))
           } catch (e) {
             rej(null,cb(e))
           }
         }
      )
       } else {
         return diagonal(B) ;
       }
     };
