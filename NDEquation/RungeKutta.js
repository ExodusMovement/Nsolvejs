'use strict';
var _in,x_n,y_n,deltax;
var rungeKutta = function*(yprime ){
  _in = yield
  x_n = _in[0], y_n = _in[1] , deltax = _in[2];
  while (true) {
    let k_1 = yprime(x_n,y_n)/6;
    let k_2 = yprime(x_n+0.5*deltax,y_n+0.5*deltax*k_1) /3;
    let k_3 = yprime(x_n+0.5*deltax,y_n+0.5*deltax*k_2) /3;
    let k_4 = yprime(x_n+0.5*deltax,y_n+0.5*deltax*k_3) /6;
    _in = yield k_1+k_2+k_3+k_4
    x_n = _in[0], y_n = _in[1] , deltax = _in[2] || deltax
  }
};
module.exports = rungeKutta
