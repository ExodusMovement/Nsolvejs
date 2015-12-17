'use strict';
var symmetricTensor = require('./symmetric');
var aSymmetricTensor = require('./symmetric');
var apply = require('./apply');
var foreach = require('./foreach');
var map = require('./map');
var _x = require('./productDirect');
var plus = require('./sum');
/** @function
 * Builder of a tensor
 * @param {Number} dimensions
 * @return {Object} tensor
 */
function create() {
    var arg, symmetric
    if (arguments[arguments.length - 1] instanceof Boolean) {
        symmetric = arguments[arguments.length - 1]
        arg = Array.prototype.slice.call(arguments, 0, arguments.length - 1)
    } else {
        symmetric = true
        arg = arguments
    }
    if (!(this instanceof create)) {
        return new create(arg)
    }
    if (symmetric) {
        symmetricTensor.call(this, arg)
    } else {
        aSymmetricTensor.call(this, arg)
    }
    this.apply = function (B, cb) {
        return apply(this, B)
    }
    this.forEach = function (map, cb) {
        return foreach.call(this, map, this, cb)
    }
    this.map = function (_map, cb) {
        return map(_map, this, cb)
    }
    this.plus = function (B, cb) {
        return plus(this, B, cb)
    }
    this._x = function (B, cb) {
        return _x(this, B, cb)
    }
}
module.exports = create
