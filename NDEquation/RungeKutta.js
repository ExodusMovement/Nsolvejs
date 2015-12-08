'use strict';
module.exports = function(x_n, y_n,deltax,yprime ){
  let k_1 = yprime(x_n,y_n)/6;
  let k_2 = yprime(x_n+0.5*deltax,y_n+0.5*deltax*k_1) /3;
  let k_3 = yprime(x_n+0.5*deltax,y_n+0.5*deltax*k_2) /3;
  let k_4 = yprime(x_n+0.5*deltax,y_n+0.5*deltax*k_3) /6;
  return k_1+k_2+k_3+k_4
};
