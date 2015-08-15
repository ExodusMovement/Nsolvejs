'use strict' ;
    /** @constructor
     * Constructor of a matrix.
     * @param {Array}
     */
var matrix =   function (array) {
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
    }
};
matrix.prototype.adj =require('./adj');
matrix.prototype.det =require('./det');
matrix.prototype.inv =require('./inverse');
matrix.prototype.minor = require('./minor');
matrix.prototype.product  = require('./product');
matrix.prototype.pscalar  =  require('./pscalar');
matrix.prototype.sum =  require('./sum');
matrix.prototype.trans = require('./trans');
matrix.prototype.multiply  = require('./multi');
matrix.prototype.pow = require('./pow');
matrix.prototype.trans = require('./dkronecker');
