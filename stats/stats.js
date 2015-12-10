'use strict'
var media = require('./media');
var std = require('./std');
var Matrix = require('../index').AL.matrix;
class Stats {
  constructor(array) {
    this.data = array
    this.ndata = array.length
    this.nvar = array[0].length
    this.media = media.bind(this)
    this.std = std.bind(this)
    this.dataMatrix = function () {return new Matrix(array)}

  }
  /**Here is where the class methods have to be defined*/
}


module.exports = stats
