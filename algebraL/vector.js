'use strict';
  var matrix = require('./Mat');
  var pscalar = require('./pscalar');
  var sum = require('./sum');
  var crossp = require('./crossp');
  var dotp = require('./dotp');
  var map = require('./map');
  /** @constructor
   * Constructor of a vector.
   * @param {Array} of way [x_1,x_2,x_3] only three dimension are supported.
   */
  var vector = function (array) {
  var _array = [];
  for (var i = 0; i < 3; i++) {
    _array[i] = [array[i]];
  }
  this._array = array ;
  // Vector are behave as 3x1 matrix
  this.matrix =  new matrix(_array);
  this.array = this.matrix.array ;
  // Define the sum method.
  this.sum = function (A) {
    var __array =
     sum(this.matrix,A.matrix).array;
    var _array = [];
    for (var i = 0; i < 3; i++) {
      _array[i] = __array[i][0];
    }
    return new vector(_array) ;
  };
  // Define the product by a scalar method.
  this.pscalar = function (a) {
    var   __array = pscalar(a,this.matrix).array ;
      var _array = [];
      for (var i = 0; i < 3; i++) {
        _array[i] = __array[i][0];
      }
      return new vector(_array) ;
  };
  // Define the map over the vector.
  this.map = function (cb) {
    var   __array = map(cb,this.matrix).array ;
      var _array = [];
      for (var i = 0; i < 3; i++) {
        _array[i] = __array[i][0];
      }
      return new vector(_array) ;
  };
  // Define the dot product method.
  this.dot = function (A) {
    return dotp(A,this) ;
  };
  // Define the cross product method
  this.cross = function (A) {
    return crossp(this,A) ;
  };
   };
// Define the class method dotp.
vector.dotp= dotp;
// DEfine the class method sum.
vector.sum = function (A,B) {
  var __array = sum(B.matrix,A.matrix).array;
  var _array = [];
  for (var i = 0; i < 3; i++) {
    _array[i] = __array[i][0];
  }
  return new vector(_array) ;
};
// DEfine the product by a scalar class method.
vector.pscalar = function (a,B) {
  var   __array = pscalar(a,B.matrix).array ;
    var _array = [];
    for (var i = 0; i < 3; i++) {
      _array[i] = __array[i][0];
    }
    return new vector(_array) ;
};
// Define the cross producto class method.
vector.crossp = crossp;
module.exports = vector;
