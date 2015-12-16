'use strict';
var _ = require('lodash'),
x = require('./multi');
var plus = require('./sum');
var scalar = require('./pscalar'),
  pow = require('./pow'),
  adj = require('./adj'),
  det = require('./det'),
  filter = require('./filter'),
  inv = require('./inverse'),
  minor = require('./minor'),
  trans = require('./trans'),
  matrix_nxm = require('./matrix_nxm'),
  map = require('./map'),
  truncate = require('../utils/truncate'),
  forEach = require('./foreach'),
  forEachColumn = require('./foreachColumn'),
  forEachRow = require('./foreachRow'),
  identM = require('./identM'),
  zeros = require('./zeros'),
  ones = require('./ones'),
  _x = require('./multiDirect'),
  _pow = require('./powDirect'),
  diagonal = require('./diagonal'),
  concatDown = require('./concatDown'),
  concatLeft = require('./concatLeft'),
  concatRight = require('./concatRight'),
  concatUp = require('./concatUp'),
  apply = require('./apply'),
  Vector = require('./vector'),
  toArray = require('./toArray'),
  toObject = require('./toObject'),
  toVectorWithRow = require('./toVectorWithRow'),
  toVectorWithColumn = require('./toVectorWithColumn')



function countColumn(array) {
  var res = []
  for (let i = 0; i < array.length; i++) {
    res.push(array[i].length)
  }
  return res
}

/** @constructor
 * Constructor of a matrix.
 * @param {Array} array to build the matrix, {Number} matrix's row , {Array} matrix's column
 */

 function Validate(array, row, column, opt) {
   if (typeof row === 'object') {
      opt = row
      row = undefined
      column = undefined
   }else if (typeof array === 'number' && !opt && row &&(column ? typeof column === 'object' : true)) {
     let pivot = row
     row = array
     array = [
       []
     ]
     opt = _.clone(column,true)
     column = _.clone(pivot,true)
   }
 return {opt:opt, row:row, column:column , array :array}
 }
var matrix = function (array, row, column, opt) {
  let validate = Validate(array, row, column, opt)
  opt = validate.opt  ;array = validate.array ; row = validate.row ;column = validate.column
  if (array instanceof Vector) {
    return array.matrix
  } else if (array instanceof matrix) {
    return array
  }else if (!(this instanceof matrix)) {
    return new matrix(array, row, column,opt)
  }
  array = (typeof array === 'object') && !Array.isArray(array) ? toArray(array, opt) : array
  array = Array.isArray(array) ? array : [
    [array]
  ]
  for (let i = 0; i < array.length; i++) {
    array[i] = Array.isArray(array[i]) ? array[i] : [array[i]]
  }
  let test = Boolean(array.length)
  if (test) {
    this._ = function (i, j) {
      if (i !== undefined && j !== undefined) {
        return this.array[(i - 1) % this.row % this._row][(j - 1) % this.getColumn(i) %
          this.array[(i - 1) % this.array.length].length
        ];
      } else if (i !== undefined && j === undefined) {
        return matrix([this.array[(i - 1) % this._row]],opt)
      } else if (i === undefined && j !== undefined) {
        return this.trans()._(j).trans()
      }
    };
    this.getColumn = function (i) {
      return this._column[(i - 1) % this._column.length]
    }
    Object.defineProperty(this, 'array', {
      get: function () {
        return this._array
      },
      set: function (array) {
        array = Array.isArray(array) ? array : [
          [array]
        ]
        for (let i = 0; i < array.length; i++) {
          array[i] = Array.isArray(array[i]) ? array[i] : [array[i]]
        }
        this._row = array.length
        this._array = array;
      }
    });
    this.opt = opt
    this._array = array
    this._row = array.length
    this.row = row || array.length;
    this.column = column || countColumn(this.array);
    this._column = Array.isArray(this.column) ? this.column : [this.column]
    this.adj = function () {
      return adj(this);
    };
    this.diagonal = function (cb) {
      return diagonal(this, cb);
    };
    this.inv = function (cb) {
      return inv(this, cb);
    };
    this.det = function (cb) {
      return det(this, cb);
    };
    this.trans = function (cb, opt) {
      return trans(this, cb, opt);
    };
    this.toObject = function () {
      return toObject(this.array);
    };
    this.concatRight = function (A, cb) {
      return concatRight(this, A, cb);
    };
    this.concatLeft = function (A, cb) {
      return concatLeft(this, A, cb);
    };
    this.concatDown = function (A, cb) {
      return concatDown(this, A, cb);
    };
    this.concatUp = function (A, cb) {
      return concatUp(this, A, cb);
    };
    this.x = function (A, cb) {
      if (typeof A === 'number') {
        return this.scalar(A, cb)
      }
      return x(this, A, cb);
    };
    this._x = function (A, cb) {
      return _x(this, A, cb);
    };
    this.plus = function (A, cb) {
      return plus(this, A, cb);
    };
    this.scalar = function (alpha, cb) {
      return scalar(alpha, this, cb);
    };
    this.pow = function (n, cb) {
      return pow(this, n, cb);
    };
    this.apply = function (A, cb) {
      return apply(this, A, cb);
    };
    this._pow = function (n, cb) {
      return _pow(this, n, cb);
    };
    this.minor = function (i, j, cb) {
      return minor(i, j, this, cb);
    };
    this.map = function (cb, _cb) {
      return map(cb, this, _cb);
    };
    this.filter = function (cb, _cb) {
      return filter(this, cb, _cb);
    };
    this.truncate = function (n, cb) {
      var _truncate = function (item) {
        return truncate(item, n);
      };
      return map(_truncate, this, cb);
    };
    this.forEach = function (map, cb) {
      forEach.call(this, map, this, cb);
    };
    this.forEachColumn = function (map, cb) {
      forEachColumn.call(this, map, this, cb);
    };
    this.forEachRow = function (map, cb) {
      forEachRow.call(this, map, this, cb);
    };
    this.toVectorWithRow = function (opt) {
      return toVectorWithRow(this, opt);
    };
    this.toVectorWithColumn = function () {
      return toVectorWithColumn(this);
    };
  }
}
matrix.toVectorWithRow = toVectorWithRow
matrix.toVectorWithColumn = toVectorWithColumn
matrix.diagonal = diagonal
matrix.adj = adj
matrix.apply = apply
matrix.det = det;
matrix.inv = inv;
matrix.minor = minor;
matrix.pscalar = scalar;
matrix.sum = plus;
matrix.trans = trans;
matrix.multiply = x;
matrix.multiplyDirect = _x
matrix.pow = pow;
matrix._pow = _pow;
matrix.map = map;
matrix.toObject = function (A) {
  if (A instanceof matrix) {
    if (A.getColumn(1) === 1) {
      return A.trans()
        .array[0]
    }
    return toObject(A.array)
  }
  return toObject(A);
};
matrix.forEach = forEach.bind(matrix);
matrix.create = matrix_nxm;
matrix.ident = identM;
matrix.zeros = zeros
matrix.ones = ones
matrix.concatDown = concatDown
matrix.concatLeft = concatLeft
matrix.concatRight = concatRight
matrix.concatUp = concatUp

module.exports = matrix;
