'use strict' ;
var _ = require('lodash'),
     matrix = require('./matrix'),
     Det = require('./det'),
     Product = require('./product'),
     Inv = require('./inverse');



/** @function
 * Solve a system of linear equations written in matrix form as Ax=B.
 * Example :
 *    A =  [[4,8],      B = [3,1]   found x = [x_1 , x_2]
 *         [3,2]]
 * @param {Array} A  {Array} B
 * @return {Object} matrix
 */
     module.exports = function (M,R){
       var A = new matrix(M);
       if (A) {
         var det = Det(A);
         if (det !== 0) {
           var length = R.length ,
           _B=[];
           for (var i = 0; i < length; i++) {
           _B[i]= [R[i]];
           }
           var B = new matrix(_B) ;
           var _R= Product(Inv(A),B);
           return _R
         }
       }
     };
