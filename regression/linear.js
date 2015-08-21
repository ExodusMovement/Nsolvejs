'use strict';
var Matrix= require('../algebraL/Mat'),mat,filter_x,filter_y,mat_x,n,distribution,mat_y,sigma,mean, matcorrelation,
mcorrelation = require('./Mcorrelation') ;


module.exports = function (array) {
  mat = new Matrix(array);
  filter_x = new Matrix([[1],[0]]);
  filter_y = new Matrix([[0],[1]]);
  mat_x =  mat.x(filter_x );
  mat_y =  mat.x(filter_y );
  n = array.length;
  sigma = Math.sqrt(Math.pow(n-1,2)/4+1 );
  mean = array[n][0]  ,
  distribution = {name : 'normal', sigma : sigma , mean : mean };
  matcorrelation = mcorrelation(n,distribution);
  

}
