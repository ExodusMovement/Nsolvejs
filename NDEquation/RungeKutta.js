'use strict';
var _in, x_n, y_n, deltax, i, y = [];
var rungeKutta = function* (yprime) {
    _in = yield
    x_n = _in[0], y_n = _in[1], deltax = _in[2], i = _in[3];
    while (true) {
        let k_1 = yprime[i](x_n, y_n) / 6;
        y = Object.assign({}, y_n);
        y[i] = y[i] + 0.5 * deltax * k_1
        console.log('y=', y, 'i===', i);
        let k_2 = yprime[i](x_n + 0.5 * deltax, y) / 3;
        y = Object.assign({}, y_n);
        y[i] = y[i] + 0.5 * deltax * k_2
        console.log('y=', y, 'i===', i);
        let k_3 = yprime[i](x_n + 0.5 * deltax, y) / 3;
        y = Object.assign({}, y_n);
        y[i] = y[i] + 0.5 * deltax * k_3
        console.log('y=', y, 'i===', i);
        let k_4 = yprime[i](x_n + deltax, y) / 6;
        _in = yield k_1 + k_2 + k_3 + k_4
        x_n = _in[0], y_n = _in[1], deltax = _in[2], i = _in[3]
    }
};
module.exports = rungeKutta
