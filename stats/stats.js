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


var stats =  new Stats([
[4,5,6,78,2],[3,4,5,2,6],[1,2,6,3,7],[0,8,6,4,2],[1,2,1,2,1]
])

console.log('stats.data =',stats.data);
console.log('stats.ndata =',stats.ndata);
console.log('stats.nvar =',stats.nvar);
console.log('stats.media =',stats.media().array);
console.log('stats.std =',stats.std().diagonal().trans().array);
console.log('stats.dataMatrix =',stats.dataMatrix().array)

module.exports = stats
