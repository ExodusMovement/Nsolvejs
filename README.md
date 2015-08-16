# JNsolve

[![Join the chat at https://gitter.im/4yopping/JNsolve](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/4yopping/JNsolve?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/4yopping/JNsolve.svg?branch=master)](https://travis-ci.org/4yopping/JNsolve) [![Inline docs](http://inch-ci.org/github/4yopping/JNsolve.svg?branch=master)](http://inch-ci.org/github/4yopping/JNsolve)
[![npm version](https://badge.fury.io/js/jnsolve.svg)](http://badge.fury.io/js/jnsolve)

## Introduction

Solve numerically equations and calculate best fit to a data array given, also provides a series of numeric routines usable.


## Installation

```bash
$ npm install jnsolve
```


## Features

- **JNsolve linear algebra**
- **JNsolve bestfit**
- **JNsolve regulafalsi**
- **JNsolve fixedpoint**
- **JNsolve bisection**
- **JNsolve Newton-Raphson**
- **JNsolve Newton-Raphson-Higher-Order**
- **JNsolve Numerical Derivative**
- **JNsolve FindRoot**

## API

### `JNsolve`

Initialize `JNsolve`

```js
var JNsolve = require('JNsolve');
```
### `Numerical analysis`


#### `JNsolve.calculusN.D`

Object with differents numerics methods to calculate the derivative of a function.

##### `JNsolve.calculusN.D.Nof(Function,Number,Array)`
Constructor that generates the numeric derivative of `Function`=> f(x) with a  `Number` => N given of divisions in an interval  `Array` => [a,b].

```js
JNsolve.D.Nof(f,1000,[2,7])
```

##### `JNsolve.calculusN.D.Nof.f_x`
Instance method what is the derivative numerical of  `Function` with a   `Number` given of divisions in an interval   `Array`.

```js
JNsolve.D.Nof(f,1000,[2,7]).f_x(3)
```
is a aproximation to the derivative of f (df_dx) on 3 with the 1000 divisions in the interval [2,7]. Is available another method that calculate the numerical derivative calculating the dx_i in a optimazed way, dx_i=h/sqrt(1+dfdx^2) with h=(b-a)/N.
##### `JNsolve.calculusN.D_opt.Nof(Function,Number,Array)`
##### `JNsolve.calculusN.D_opt.Nof.f_x`
##### `JNsolve.calculusN.D.linear_interpolation(Array)`
Is a constructor that generates the numeric linear interpolation of data given in `Array`= [[x_1,y_2],[x_2,y_3],...[x_n,y_n]] in the interval [x_1,x_n].

```js
array_to_interpolate = [[0,3.2],[1,4.6],[2,5.1],[4,6.9]] ;
JNsolve.calculusN.D.linear_interpolation(array_to_fit)
```
##### `JNsolve.calculusN.D.linear_interpolation(Array).function_interpolated`
Is a instance method what is the interpolated function of `Array` given.

```js
JNsolve.D.linear_interpolation(array_to_interpolate).function_interpolated(2.5)
```
Is a aproximation interpolated to the `Array` = [[0,3.2],[1,4.6],[2,5.1],[4,6.9]].

#### `JNsolve.nsolveqn(Function, Array[,Number,Object])`
Is a method that calculate numerically the solution of `Function`=>f(x)=0 try in the interval (`Array`=>[a,b]) beginning  on `Number`=>x_0 (initial point).

```js
function f(x) {
  return x+Math.cos(x) ;
}
JNsolve.nsolveqn(f,0.5,[0,1]) = 0.73952
```
The `Object`is default options and are { npoints_DNumeric : 1000, presicion : 0.001 , nstepsmax : 1000 , method : 'Newton_Rapshon' }. The mothods available are RegulaFalsi, bisection,fixedpoint,Newton_Raphson_Higherorder, Newton_Raphson_Higherorder. The rest of routines for every method are availables:

#### `JNsolve.calculusN.RegulaFalsi(Function,Array[,Object])`
#### `JNsolve.calculusN.bisection(Function, Array[,Object])`
#### `JNsolve.calculusN.fixedpoint(Function,Number[,Object])`
#### `JNsolve.calculusN.Newton_Raphson(Function,Array[, Number, Object])`
#### `JNsolve.calculusN.Newton_Raphson_Higherorder(Function,Array[, Number, Object])`

in every case if x_0 is undefined, is taken from a random number  in interval `Array`=>[a,b]. All these methods return a object with properties Root, numSteps and method used.

#### `JNsolve.calculusN.findroot(Function, Array[,Number,Object])`
Is a method that calculate numerically the solution of `Function`=>f(x)=0 try in the interval (`Array`=>[a,b]) beginning  on `Number`=>x_0 (initial point).

```js
JNsolve.calculusN.findroot(f,0.5,[0,1]) = 0.73952
```
The `Object`is default options and are { npoints_DNumeric : 1000, precision : 0.001 , nstepsmax : 1000 , method : 'Newton_Rapshon' }. Here, findroot try find the root of function by all methods availables in the module.

### `Data Fitting`

#### `JNsolve.fit.best(Array[,Array,Array,Object])`
![Plot Data with Best fit](./plot.jpeg)


Calculate the best fit using the first `Array`= [[x_1,y_2],[x_2,y_3],...[x_n,y_n]] argument as data input, the second  `Array` = [z_1,z_2...z_m] argument are the values of x's for which is necessary calculate their y`s values respectively, the third argument are the values of "y" for which is queried the values of "x". The properties of options object are smoothing (default = True), noiseeliminate (default = True), smoothingmethod (default ='exponential' only by moment), alpha (default = 0.8). The noiseeliminate method eliminate data that are beyond of 3.5 standard deviation from mean[(99.95 % Reliability if data have a normal distribution)](http://onlinestatbook.com/2/calculators/normal_dist.html), does that make a loop filter until that not one data is out of this limit. Return a object with the properties: ans_ofY,ans_ofX, fitUsed, fitEquationUsed, fitParamsUsed, fitPointsUsed, fitWithError and fit.

```js
array_to_fit =[[0,1.1],[1,4.6],[2,1.9],[4,15]];
array_of_x = [3.4, 4.8, 8, 11] ;
array_of_y = [8,8.5,15,20];
JNsolve.bestfit(array_to_fit,array_of_x,array_of_y ) =
fit = { ans_ofY:
   [ [ 3.4, 10.503636363636366 ],
     [ 4.8, 21.457999999999984 ],
     [ 8, 62.92272727272717 ],
     [ 11, 122.55181818181795 ] ],
  ans_ofX:
   [ [ 2.9665881626844426, 8 ],
     [ 3.0592101464091335, 8.5 ],
     [ 4.043974243768653, 15 ],
     [ 4.641597409834032, 20 ] ],
  fitUsed: 'polynomial',
  fitEquationUsed: 'y = 1.12x^2 + -1.33x + 2.11',
  fitParamsUsed: [ 2.1118181818181747, -1.3259090909090778, 1.1159090909090879 ],
  fitPointsUsed:
   [ [ 0, 2.1118181818181747 ],
     [ 1, 1.9018181818181847 ],
     [ 2, 3.9236363636363705 ],
     [ 4, 14.662727272727269 ] ],
  fitWithError: 2.0329834635543396,
  fit:
   { linear: { regression: [Object], error: 2.8540621486399553 },
     exponential: { regression: [Object], error: 2.094639809897245 },
     logarithmic: { regression: [Object], error: NaN },
     power: { regression: [Object], error: NaN },
     polynomial: { regression: [Object], error: 2.0329834635543396 },
     best: { name: 'polynomial', error: 2.0329834635543396, f: [Function] } } }
```
### `Linear Algebra`
#### `JNsolve.AL.matrix(Array)`
Is a constructor of a object matrix, the form of Array param have to be like  `Array`= [[x_11,...x_1n],[x_21,...y_2n],...[x_m1,...x_mn]], if someone raw do not have the same column number returns a undefined object. The instance properties are raw, column,array and det which are the number of raw and column, the array is the array self passed to constructor. The Det property is obvious. The instance methods are _,x,plus, pow, adj, inv, trans and scalar: the first is a method with integers parameters i,j that is the i,j member of matrix object, the second is the product by another matrix, accept as parameters  matrix objects, plus method adds the object matrix to matrix parameters passed to the method, pow calculates the power of matrix and accepts as parameter the power n (integer) and finally the last  calculates the scalar product with the number passed as parameter to method. The matrix constructor has the class methods adj, det, inv, minor, pscalar, sum, trans, multiply, and pow that calculates the adjoint, determinant, inverse, minor, scalar product, sum, transposed, multiplication and power, the parameters of each one are obviously and it is a matrix object. Every method return a matrix object such way that can be chained another methods.

```js
var Matrix = require('JNsolve').matrix;
var matrix =[[0,1.1],[1,4.6]];
var mat = Matrix(matrix);
mat.row == 3; // True
mat.column == 2 // True
mat.array ; // [[0,1.1],[1,4.6]]
mat._(1,1) === 0  ; // True
mat.x(mat,mat); // [[5,24.5],[22.3,107.5]] or chained 
mat.x(mat).x(mat) // etc
mat.plus(mat,mat,mat) // [[0,4.4],[4,18.4]] or chained 
mat.plus(mat).plus(mat).plus(mat) // etc
mat.scalar(0) // [[0,0],[0,0]] or chained
mat.scalar(0).scalar(4)  // etc 
mat.pow(2); // [[1.1,5.1],[4.6,22.3]] //
mat.pow(2).scalar(2) //[[2.2,10.2],[9.2,44.6]]
Matrix.pow(mat,2) //[[1.1,5.1],[4.6,22.3]]
Matrix.adj(mat) // [[4.6,-1.1],[-1,0]] equivalent mat.adj()
Matrix.adj(mat).scalar(2) // [[9.2,-2.2],[-2,0]]
Matrix.det(mat) // -1.1   equivalent mat.det
Matrix.inv(mat) // [[-4.2,1],[0.9,0]]  equivalent mat.inv()
Matrix.minor(1,1,mat) // [[4.6]]  equivalent mat.minor(1,1)
Matrix.pscalar(2,mat) // [[0,2.2],[2,9.2]]   equivalent mat.scalar(2)
Matrix.sum(mat,mat,mat,mat,mat) // [[0,5.5],[5,23]] 
Matrix.multiply(mat,mat,mat,mat) // [[24.5,108.2],[107.5,518.8]]
Matrix.trans(mat) // [[0,1],[1.1,4.6]]  equivalent mat,trans()
```
#### `JNsolve.AL.solveLE(Array,Array)`
Solve the linear equation system:

a_11x_1+a_12 x_2+...a_1n x_n = b_1


.						                 	 .	


.					                		 .


.					                 		 .	


a_n1x_1+a_n2 x_2+...a_nn x_n = b_n

to do that is necessary pass the array [[a_11,a_12...a_1n]...,[a_n1,a_n2...a_nn]]firstly and the result array [b_1,b_2...,b_n]. Return the array solution for the system [x_1,x_2,...,x_n].
```js
var AL = require('JNsolve').AL;
var mat = [[0,1.1,6],[1,4.6,-5],[0.1,0,-0.9]] ;
var result = [5,6,0];
solveLE(mat,result) ; //[6.36,0.68,0.7,]
```


##Contributing
In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.  For any bugs report please contact to me via e-mail.

##Licence
The MIT License (MIT)

Copyright (c) 2015 Jesús Edel Cereceres with Andrés González and Marco Godínez as collaborators, 4yopping and all the related trademarks.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
