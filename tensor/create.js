'use strict';
var symmetricTensor  =require('./symmetric');
var aSymmetricTensor  =require('./symmetric');
/** @function
 * Builder of a tensor
 * @param {Number} n {Number} m {Function} mapping .
 * @return {Object} vector
 */
 function create() {
   var arg,symmetric
   if (arguments[arguments.length-1] instanceof Boolean) {
     symmetric = arguments[arguments.length-1]
     arg = Array.prototype.slice.call(arguments,0,arguments.length-1)
   }else{
     symmetric  = true
     arg = arguments
   }
   if (!(this instanceof create)) {return new create(arg)}
   if (symmetric) {
     symmetricTensor.call(this,arg)
   }else {
     aSymmetricTensor.call(this,arg)
   }
}
module.exports = create

var tensor = module.exports(2,4)
console.log('create=',tensor);
console.log('create=',tensor.setData.length);
console.log('create=',tensor._(1,2));
