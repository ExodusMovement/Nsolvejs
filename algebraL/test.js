'use strict';
let Matrix = require('./Mat');
/** @function
 * multiply the matrix object.
 * @param {Object} matrix {Object} matrix.
 * @return {Object} matrix
 */


let A = Matrix.create(40,40,function (i,j) {
  return Math.log(i*j);
});


Matrix.pow(A,2,function (error,C) {
  console.log('B2=',C._(1,1));
});
let B = Matrix.pow(A,4);
console.log('B11=',B._(1,1));
