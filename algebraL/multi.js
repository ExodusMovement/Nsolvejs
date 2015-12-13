'use strict' ;
var product = require('./product');

/** @function
 * multiply the matrix object.
 * @param {Object} matrix {Object} matrix.
 * @return {Object} matrix
 */
function multi (array){
  var  Matrix = require('./Mat');
  var l = array.length, A =array[0],B;
  if (!(A instanceof Matrix)) {A =new  Matrix(A)}
    for (var p = 1; p < l; p++){
      B = array[p];
      if (!(B instanceof Matrix)) {B =new  Matrix(B)}
      A= product(A,B)  ;

    }
return A }


module.exports = function () {
  var arg= Array.prototype.slice.call(arguments);
  var cb = arguments[arguments.length-1];
  if (typeof cb === 'function') {
    arg.pop();
    return new Promise(function(full,rej){
      try {
        full(cb(null,multi(arg)))
      } catch (e) {
        rej(cb( e,null ) )
      }
    }
 )
  } else if (cb === undefined){
    arg.pop()
    return multi(arg) ;
  }else {
  return multi(arg) ;
  }
};
var  Matrix = require('./Mat');
console.log();
var A = Matrix([4,3,5,6])
module.exports([[2,3],[0]],4,5).
x(A,function (err,argument) {console.log('argument=',argument);return  argument}).
then(function (argument) {
  console.log('arg===>>>>>>>>>>>>>',argument);
})
