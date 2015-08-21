'use strict';
var dkronecker = require('../utils/dkronecker'),
    sum = require('../utils/Summation'),
    Pi = Math.PI,
    sqrtpi = Math.sqrt(2*Pi),
    stepf= require('../utils/stepfunction');

module.exports = {
    uniform : function (n) {
      return function (i,j) {
          if (i<0 &&j<0 &&  i > n && j>n && n<0) { return ;}
        return dkronecker(i,j)/n ;
      } ;
      },
      windows : function (n,params) {
       var   xinterval =  params.xinterval , yinterval = params.yinterval;
      if (n<0&& xinterval[0]< 0 &&xinterval[0]> n &&
        xinterval[1]< 0 && xinterval[1]> n &&  yinterval[0]< 0 && yinterval[0]> n &&
        yinterval[1]< 0 && yinterval[1]> n && (yinterval[1]-yinterval[0])===(xinterval[1]-xinterval[0]) ) { return ;}
        yinterval = yinterval || xinterval;
        return function (i,j) {
          if (i<0 &&j<0 &&  i > n && j>n && j < 0){return ; }
          return dkronecker(i,j)*stepf(i-xinterval[0])*stepf(i-xinterval[1])*stepf(j-yinterval[0])*stepf(j-xinterval[1])/(xinterval[1]-xinterval[0]+1) ;
        };
      },
      normal : function (n,params) {
        var mean = params.mean, sigma = params.sigma ;
        var normal = function (k) {
        return   Math.exp(Math.pow((k-mean)/sigma,2))/(sqrtpi*sigma) ;
        }
        var normalization = sum(1,n,normal);
        return function (k) {
          return normal(k)/normalization ;
        };
        },

        exponential : function(n,params) {
          var alpha = params.alpha, reverse = params.reverse ;
          if (reverse === undefined) { reverse = true ;}
          var normalization = 1-Math.pow(1-alpha,n+1);
          if (reverse) {
            return function (l) {
              return (alpha*Math.pow(1-alpha,n-l))/normalization   ;
            };
          }
          return function (l) {
            return (alpha*Math.pow(1-alpha,l-1))/normalization   ;
          } ;
          },
};
