'use strict' ;
/** @function
 * multiply the matrix object.
 * @param {Object} matrix {Object} matrix.
 * @return {Object} matrix
 */
function apply(A,B){
       if (!A || !B) { return ;}
       if( A.column === B.column && A.row === B.row ){
         var ii=A.row,kk=B.column,array = [],i,k ;
         for (i=1 ;i<=ii;i++){
           array[i-1]=[];
           for (k=1 ;k<=kk;k++){
             if (typeof A._(i,k) === 'function') {
                array[i-1][k-1]= A._(i,k)(B._(i,k));
             } else {
                  array[i-1][k-1]= A._(i,k)*B._(i,k);
             }
           }
         }
         var Matrix = require('./Mat');
         return  new Matrix(array);
       }
     }


     module.exports = function (A,B,cb) {
       if (cb && typeof cb === 'function') {
         setImmediate(function () {
           cb(apply(A,B));
         });
       } else {
         return apply(A,B);
       }
     };
