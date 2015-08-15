'use strict' ;
var x = require('./multi');
var plus = require('./sum');
var scalar = require('./pscalar');
    /** @constructor
     * Constructor of a matrix.
     * @param {Array}
     */
var matrix =  function (array){
    var length = array.length,i ,first_lenght = array[0].length ;
    var test = length || first_lenght;
    for (i=0 ;i<length;i++){
      if(array[i].length !== first_lenght){ test = false;}
    }
    if(test){
      this._ = function (i,j) {
      return array[i-1][j-1];
      };
      this.raw =length ;
      this.column = first_lenght ;
      this.array = array;
      this.x = function (A) {
        return x(this,A);
      };
      this.plus = function (A) {
        return plus(this,A);
      };
      this.scalar = function (alpha) {
        return scalar(alpha,this);
      };
    }
};
matrix.adj =require('./adj');
matrix.det =require('./det');
matrix.inv =require('./inverse');
matrix.minor = require('./minor');
matrix.pscalar  =  scalar ;
matrix.sum = plus ;
matrix.trans = require('./trans');
matrix.multiply  = x ;
matrix.pow = require('./pow');
matrix.dkronecker = require('./dkronecker');

module.exports = matrix ;
