'use strict' ;
var  Matrix = require('./Mat'),
     det = require('./det'),
     product = require('./product'),
     inv = require('./inverse');
/** @function
 * Solve a system of linear equations written in matrix form as Ax=B.
 * Example :
 *    A =  [[4,8],      B = [3,1]   found x = [x_1 , x_2]
 *         [3,2]]
 * @param {Array} A  {Array} B
 * @return {Object} matrix
 */
     module.exports = function (M,R){
       var A = new Matrix(M);
       if (A) {
         var dett = det(A);
         if (dett !== 0) {
           var length = R.length ,
           _B=[];
           for (var i = 0; i < length; i++) {
           _B[i]= [R[i]];
           }
           var B = new Matrix(_B) ;
           var _R= product(inv(A),B);
           return _R ;
         }
       }
     };
