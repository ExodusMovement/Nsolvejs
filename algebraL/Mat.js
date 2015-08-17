'use strict' ;
var x = require('./multi');
var plus = require('./sum');
var scalar = require('./pscalar'),
pow = require('./pow'),
adj =require('./adj'),
det =require('./det'),
inv =require('./inverse'),
minor = require('./minor'),
trans = require('./trans'),
map = require('./map');
    /** @constructor
     * Constructor of a matrix.
     * @param {Array}
     */
var matrix =  function (array){
    var length = array.length,i  ;
    var test = Boolean(length);

    if(test && array[0] instanceof Array){
      var first_lenght = array[0].length;
      for (i=0 ;i<length;i++){
        if(array[i].length !== first_lenght){ test = false;}
      }
      this._ = function (i,j) {
      return array[i-1][j-1];
      };
      this.raw =length ;
      this.column = first_lenght ;
      this.array = array;
      this.adj =  function (){
          return adj(this);
      } ;
      this.inv =  function (){
          return inv(this) ;
        };
      this.det = det(this) ;
      this.trans =  function (){
          return trans(this);
        };
      this.x = function (A) {
        return x(this,A);
      };
      this.plus = function (A) {
        return plus(this,A);
      };
      this.scalar = function (alpha) {
        return scalar(alpha,this);
      };
      this.pow = function (n) {
        return pow(this,n );
      };
      this.minor = function (i,j) {
        return minor(i,j,this );
      };
      this.map = function (cb) {
        return map(cb,this);
      };
    }
};
matrix.adj =adj;
matrix.det =det;
matrix.inv =inv;
matrix.minor = minor;
matrix.pscalar  =  scalar ;
matrix.sum = plus ;
matrix.trans = trans;
matrix.multiply  = x ;
matrix.pow = pow;
matrix.map = map;
matrix.dkronecker = require('./dkronecker');

module.exports = matrix ;
