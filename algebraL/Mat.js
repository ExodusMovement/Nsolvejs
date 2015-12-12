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
matrix_nxm = require('./matrix_nxm'),
map = require('./map'),
truncate = require('../utils/truncate'),
forEach = require('./foreach');
var identM= require('./identM');
var zeros = require('./zeros');
var ones = require('./ones');
var _x =  require('./multiDirect');
var _pow = require('./powDirect');
var diagonal = require('./diagonal')
var concatDown = require('./concatDown')
var concatLeft = require('./concatLeft')
var concatRight = require('./concatRight')
var concatUp = require('./concatUp')
var apply = require('./apply')

    /** @constructor
     * Constructor of a matrix.
     * @param {Array}
     */
var matrix =  function (array){
      if(!(this instanceof matrix)){return new matrix(array)}
      if (!array) { return ;}
      var length = array.length,i  ;
      var test = Boolean(length);
      if(test && array[0] instanceof Array){
        var first_lenght = array[0].length;
        for (i=0 ;i<length;i++){
          if(array[i].length !== first_lenght){ test = false;}
        }
        if (test) {
          this._ = function (i,j) {
            if (i !== undefined && j !== undefined) {
              return array[i-1][j-1];
            } else   if (i !== undefined && j === undefined)  {
              return (new matrix(array[i-1])).trans() ;
            }else   if (i === undefined && j !== undefined)  {
              return this.trans()._(j).trans() ;
            }
          };
          this.row =length ;
          this.column = first_lenght ;
          this.array = array;
          this.adj =  function (){
              return adj(this);
          } ;
          this.diagonal =  function (){
              return diagonal(this);
          } ;
          this.inv =  function (){
              return inv(this) ;
          };
          this.det = function () {
              return  det(this) ;
          };
          this.trans =  function (){
            return trans(this);
          };
          this.concatRight =  function (A,cb){
            return concatRight(this,A,cb);
          };
          this.concatLeft =  function (A,cb){
            return concatLeft(this,A,cb);
          };
          this.concatDown =  function (A,cb){
            return concatDown(this,A,cb);
          };
          this.concatUp =  function (A,cb){
            return concatUp(this,A,cb);
          };
          this.x = function (A,cb) {
            if (typeof A === 'number') {
              return this.scalar(A,cb)
            }
            if (!(A instanceof matrix) && Array.isArray(A)) {A = matrix(A)}
            return x(this,A,cb);
          };
          this._x = function (A,cb) {
            return _x(this,A,cb);
          };
          this.plus = function (A,cb) {
            if (!(A instanceof matrix) && Array.isArray(A)) {A = matrix(A)}
            return plus(this,A,cb);
          };
          this.scalar = function (alpha,cb) {
            return scalar(alpha,this,cb);
          };
          this.pow = function (n,cb) {
            return pow(this,n ,cb);
          };
          this.apply = function (A,cb) {
            return apply(this, A,cb);
          };
          this._pow = function (n,cb) {
            return _pow(this,n ,cb);
          };
          this.minor = function (i,j,cb) {
            return minor(i,j,this,cb);
          };
          this.map = function (cb,_cb) {
            return map(cb,this,_cb);
          };
          this.truncate = function (n,cb) {
            var _truncate = function (item) {
              return truncate(item,n);
            };
            return map(_truncate,this,cb);
          };
          this.forEach = function (map,cb) {
            forEach(map,this,cb);
          };
        }
    }
};
matrix.diagonal =diagonal
matrix.adj =adj
matrix.apply =apply
matrix.det =det;
matrix.inv =inv;
matrix.minor = minor;
matrix.pscalar  =  scalar ;
matrix.sum = plus ;
matrix.trans = trans;
matrix.multiply  = x ;
matrix.multiplyDirect  = _x
matrix.pow = pow;
matrix._pow = _pow;
matrix.map = map;
matrix.forEach = forEach;
matrix.create = matrix_nxm;
matrix.diagonal = identM;
matrix.zeros = zeros
matrix.ones = ones
matrix.concatDown = concatDown
matrix.concatLeft = concatLeft
matrix.concatRight = concatRight
matrix.concatUp = concatUp

module.exports = matrix ;
