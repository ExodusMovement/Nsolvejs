'use strict';
var Matrix= require('../algebraL/Mat');


module.exports = function (n,m,map) {
  var array = [];
  for (var i = 0; i <n ; i++) {
      array[i]=[];
      for (var j = 0; j <m ; j++) {
          array[i][j]=map(i,j);
      }
  }
 return new Matrix(array);
}
