'use strict';
var _ = require('lodash'),
    x = require('./multi');
var plus = require('./sum');
var scalar = require('./pscalar'),
    pow = require('./pow'),
    adj = require('./adj'),
    det = require('./det'),
    filter = require('./filter'),
    filterByPositionRow = require('./filterByPositionRow'),
    filterByPositionColumn = require('./filterByPositionColumn'),
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
    } else if (typeof array === 'number' && !opt && row && (column ? typeof column === 'object' : true)) {
        let pivot = row
        row = array
        array = [
            []
        ]
        opt = _.clone(column, true)
        column = _.clone(pivot, true)
    }
    return {
        opt: opt,
        row: row,
        column: column,
        array: array
    }
}
var matrix = function (array, row, column, opt) {
    let validate = Validate(array, row, column, opt)
    opt = validate.opt;
    array = validate.array;
    row = validate.row;
    column = validate.column
    if (array instanceof Vector) {
        return array.matrix
    } else if (array instanceof matrix) {
        return array
    } else if (!(this instanceof matrix)) {
        return new matrix(array, row, column, opt)
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
        this._ = (function (i, j) {
            if (i !== undefined && j !== undefined) {
                return this.array[(i - 1) % this.row % this._row][(j - 1) % this.getColumn(i) % this.array[(i - 1) % this.array.length].length];
            } else if (i !== undefined && j === undefined) {
                return matrix([this.array[(i - 1) % this._row]], opt)
            } else if (i === undefined && j !== undefined) {
                return this.trans()._(j).trans()
            }
        }).bind(this);
        this.getColumn = (function (i) {
            return this._column[(i - 1) % this._column.length]
        }).bind(this)
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
        this.adj = (function () {
            return adj(this);
        }).bind(this);
        this.diagonal = (function (cb) {
            return diagonal(this, cb);
        }).bind(this);
        this.inv = (function (cb) {
            return inv(this, cb);
        }).bind(this);
        this.det = (function (cb) {
            return det(this, cb);
        }).bind(this);
        this.trans = (function (cb, opt) {
            return trans(this, cb, opt);
        }).bind(this);
        this.toObject = (function () {
            return toObject(this.array);
        }).bind(this);
        this.concatRight = (function (A, cb) {
            return concatRight(this, A, cb);
        }).bind(this);
        this.concatLeft = (function (A, cb) {
            return concatLeft(this, A, cb);
        }).bind(this);
        this.concatDown = (function (A, cb) {
            return concatDown(this, A, cb);
        }).bind(this);
        this.concatUp = (function (A, cb) {
            return concatUp(this, A, cb);
        }).bind(this);
        this.x = (function (A, cb) {
            if (typeof A === 'number') {
                return this.scalar(A, cb)
            }
            return x(this, A, cb);
        }).bind(this);
        this._x = (function (A, cb) {
            return _x(this, A, cb);
        }).bind(this);
        this.plus = (function (A, cb) {
            return plus(this, A, cb);
        }).bind(this);
        this.scalar = (function (alpha, cb) {
            return scalar(alpha, this, cb);
        }).bind(this);
        this.pow = (function (n, cb) {
            return pow(this, n, cb);
        }).bind(this);
        this.apply = (function (A, cb) {
            return apply(this, A, cb);
        }).bind(this);
        this._pow = (function (n, cb) {
            return _pow(this, n, cb);
        }).bind(this);
        this.minor = (function (i, j, cb) {
            return minor(i, j, this, cb);
        }).bind(this);
        this.map = (function (cb, _cb) {
            return map(cb, this, _cb);
        }).bind(this);
        this.filter = (function (cb, _cb) {
            return filter(this, cb, _cb);
        }).bind(this);
        this.filterByPositionRow = (function (cb, _cb) {
            return filterByPositionRow(this, cb, _cb);
        }).bind(this);
        this.filterByPositionColumn = (function (cb, _cb) {
            return filterByPositionColumn(this, cb, _cb);
        }).bind(this);
        this.truncate = (function (n, cb) {
            var _truncate = function (item) {
                return truncate(item, n);
            };
            return map(_truncate, this, cb);
        }).bind(this);
        this.forEach = (function (map, cb) {
            forEach.call(this, map, this, cb);
        }).bind(this);
        this.forEachColumn = (function (map, cb) {
            forEachColumn.call(this, map, this, cb);
        }).bind(this);
        this.forEachRow = (function (map, cb) {
            forEachRow.call(this, map, this, cb);
        }).bind(this);
        this.toVectorWithRow = (function (opt) {
            return toVectorWithRow(this, opt);
        }).bind(this);
        this.toVectorWithColumn = (function () {
            return toVectorWithColumn(this);
        }).bind(this);
    }
}
matrix.toVectorWithRow = (toVectorWithRow).bind(matrix)
matrix.toVectorWithColumn = toVectorWithColumn.bind(matrix)
matrix.diagonal = diagonal.bind(matrix)
matrix.adj = adj.bind(matrix)
matrix.apply = apply.bind(matrix)
matrix.det = det.bind(matrix);
matrix.inv = inv.bind(matrix);
matrix.minor = minor.bind(matrix);
matrix.pscalar = scalar.bind(matrix);
matrix.sum = plus.bind(matrix);
matrix.trans = trans.bind(matrix);
matrix.multiply = x.bind(matrix);
matrix.multiplyDirect = _x.bind(matrix)
matrix.pow = pow.bind(matrix);
matrix._pow = _pow.bind(matrix);
matrix.map = map.bind(matrix);
matrix.toObject = (function (A) {
    if (A instanceof matrix) {
        if (A.getColumn(1) === 1) {
            return A.trans().array[0]
        }
        return toObject(A.array)
    }
    return toObject(A);
}).bind(matrix);
matrix.forEach = forEach.bind(matrix);
matrix.create = matrix_nxm.bind(matrix);
matrix.ident = identM.bind(matrix);
matrix.filter = filter.bind(matrix);
matrix.filterByPositionRow = filterByPositionRow.bind(matrix);
matrix.filterByPositionColumn = filterByPositionColumn.bind(matrix);
matrix.zeros = zeros.bind(matrix)
matrix.ones = ones.bind(matrix)
matrix.concatDown = concatDown.bind(matrix)
matrix.concatLeft = concatLeft.bind(matrix)
matrix.concatRight = concatRight.bind(matrix)
matrix.concatUp = concatUp.bind(matrix)
module.exports = matrix;