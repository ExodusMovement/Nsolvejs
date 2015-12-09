'use strict'
var RungeKutta = require('./RungeKutta');
var nsolve = function (f,interval,deltax0) {
	let it = RungeKutta(f); it.next()
	let a = interval[0],
	b = interval[1],
	x_n=a[0],
	y_n = a[1],m,solution = [[x_n,y_n]],y_n_1,x_n_1,deltax
	while (x_n <= b) {
		m= f(x_n,y_n)
		m= Math.abs(m) <= 0.0001 ? 1: m
		deltax = deltax0/Math.abs(m)
		y_n_1 = y_n + it.next([x_n,y_n,deltax]).value*deltax
		x_n_1 = x_n + deltax
		solution.push([x_n_1,y_n_1])
		y_n = y_n_1
		x_n = x_n_1
	}
	return solution

}


console.log(nsolve(Math.cos,[[2,4],10],0.001));
