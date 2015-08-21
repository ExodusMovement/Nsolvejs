'use strict';
var ident = require('./algebraL/identM'),
Fcorrelation = require('./Fcorrelation');
module.exports = function (n,distribution) {
  var mat = ident(n),f;
  f = Fcorrelation[distribution.name](n,distribution.params);
  mat.map(function (item,i,j) {
    return item*f(i,j);
  })
  return mat;
}
