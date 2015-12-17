'use strict';
var media = require('./media');
var std = require('./std');
var cov = require('./cov');
var Matrix = require('../algebraL/Mat');

function stats(array) {
    this.data = array
    this.ndata = array.length
    this.nvar = array[0].length
    this.media = media.bind(this)
    this.std = std.bind(this)
    this.covariance = cov.bind(this)
    this.dataMatrix = function () {
        return new Matrix(array)
    }
}
module.exports = stats
