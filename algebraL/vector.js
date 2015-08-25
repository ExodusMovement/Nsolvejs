'use strict';
  var matrix = require('./Mat');
  var pscalar = require('./pscalar');
  var sum = require('./sum');
  var crossp = require('./crossp');
  var dotp = require('./dotp');
  var map = require('./map');
  /** @constructor
   * Constructor of a Vector.
   * @param {Array} of way [x_1,x_2,..x_n] only three dimension are supported.
   */
  var Vector = function (array) {
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
    return new Vector(_array) ;
  };
  // Define the product by a scalar method.
  this.pscalar = function (a) {
    var   __array = pscalar(a,this.matrix).array ;
      var _array = [];
      for (var i = 0; i < 3; i++) {
        _array[i] = __array[i][0];
      }
      return new Vector(_array) ;
  };
  // Define the map over the Vector.
  this.map = function (cb) {
    var   __array = this.matrix.array ;
      var _array = [];
      for (var i = 0; i < 3; i++) {
        _array[i] = cb(__array[i][0],i);
      }
      return new Vector(_array) ;
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
Vector.dotp= dotp;
// DEfine the class method sum.
Vector.sum = function (A,B) {
  var __array = sum(B.matrix,A.matrix).array;
  var _array = [];
  for (var i = 0; i < 3; i++) {
    _array[i] = __array[i][0];
  }
  return new Vector(_array) ;
};
// DEfine the product by a scalar class method.
Vector.pscalar = function (a,B) {
  var   __array = pscalar(a,B.matrix).array ;
    var _array = [];
    for (var i = 0; i < 3; i++) {
      _array[i] = __array[i][0];
    }
    return new Vector(_array) ;
};
// Define the cross producto class method.
Vector.crossp = crossp;
Vector.create_n = function (n,map) {
  var i,array=[];
  for ( i = 0; i < n; i++) {
    array[i] = map(i);
  }
  return new Vector(array) ;
};

//Define the mapping class method.
Vector.map = function (cb,B) {
  var   __array = B.matrix.array ;
    var _array = [];
    for (var i = 0; i < 3; i++) {
      _array[i] = cb(__array[i][0],i);
    }
    return new Vector(_array) ;
  };
module.exports = Vector;
