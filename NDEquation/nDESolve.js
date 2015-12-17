'use strict'
var RungeKutta = require('./RungeKutta');
var nsolve = function (f, initCondition, deltax0) {
    f = Array.isArray(f) ? f : [f]
    let it = RungeKutta(f);
    it.next()
    let interval = initCondition[0]
    let a = interval[0],
        b = interval[1],
        y0 = initCondition[1],
        l = Array.isArray(initCondition[1]) ? initCondition[1].length : 1,
        x_n = a
    y0 = Array.isArray(y0) ? y0 : [y0]
    let y_n = y0,
        m, solution = [
            [a].concat(y0)
        ],
        y_n_1 = [],
        x_n_1, deltax
    while (x_n <= b) {
        for (var i = 0; i < l; i++) {
            m = f[i](x_n, y_n)
            deltax = deltax0 / (Math.abs(m) + 1)
            y_n_1[i] = y_n[i] + it.next([x_n, y_n, deltax, i]).value * deltax
        }
        x_n_1 = x_n + deltax
        solution.push([x_n_1].concat(y_n_1))
        y_n = y_n_1
        x_n = x_n_1
    }
    return solution
}
console.log(nsolve([Math.cos, Math.sin], [
    [2, 10],
    [4, 4]
], 2));
