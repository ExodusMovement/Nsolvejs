'use strict' ;
/** @function
 * multiply the matrix object.
 * @param {Object} matrix {Object} matrix.
 * @return {Object} matrix
 */
 var a
function apply(A,B){
       if (!A || !B) { return ;}
       var  Matrix = require('./Mat');
       if (!(A instanceof Matrix)) {A = new Matrix(A)}
       if (!(B instanceof Matrix)) {B = new Matrix(B)}
       if( A.column === B.column && A.row === B.row ){
         var ii=A.row,kk=B.column,array = [],i,k ;
         for (i=1 ;i<=ii;i++){
           array[i-1]=[];
             a = (typeof B._(i,k) === 'function') ? B._(i,k)() : B._(i,k) ;
             if (typeof A._(i,k) === 'function') {
                array[i-1][k-1]= A._(i,k)(a);
             } else {
                  array[i-1][k-1]= A._(i,k)*a;
             }
           }
         }
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

console.log(module.exports([[34]],[[function () {
  console.log('hola');
  return 5
}]]));
