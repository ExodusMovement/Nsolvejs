# Nsolvejs
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/4yopping/Nsolvejs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) [![Build Status](https://travis-ci.org/4yopping/Nsolvejs.svg?branch=master)](https://travis-ci.org/4yopping/Nsolvejs) [![Inline docs](http://inch-ci.org/github/4yopping/Nsolvejs.svg?branch=master&style=shields)](http://inch-ci.org/github/4yopping/Nsolvejs) [![npm version](https://badge.fury.io/js/nsolvejs.svg)](http://badge.fury.io/js/nsolvejs) [![Stories in Ready](https://badge.waffle.io/4yopping/Nsolvejs.svg?label=ready&title=Ready)](http://waffle.io/4yopping/Nsolvejs) ![Dependencies](https://david-dm.org/4yopping/Nsolvejs.svg)

## Introduction
(Before JNsolve)Solve numerically equations and calculate best fit to a data array given, also provides a series of numeric routines usable.

## Installation

```bash
$ npm install Nsolvejs
```

## Features
- **Nsolvejs linear algebra**
- **Nsolvejs statistical**
- **Nsolvejs regression**
- **Nsolvejs bestfit**
- **Nsolvejs regulafalsi**
- **Nsolvejs fixedpoint**
- **Nsolvejs bisection**
- **Nsolvejs Newton-Raphson**
- **Nsolvejs Newton-Raphson-Higher-Order**
- **Nsolvejs Numerical Derivative**
- **Nsolvejs FindRoot**

## API
### `Nsolvejs`
Initialize `Nsolvejs`

```js
var Nsolvejs = require('nsolvejs');
```
### `Linear Algebra`
#### `Nsolvejs.AL.matrix(Array[,row,column])`
Is a constructor of a object matrix, the form of Array param have to be like  `Array`= [[x_11,...x_1n],[x_21,...y_2n],...[x_m1,...x_mn]], the row param is the matrix row number and column is a array (can be just a number if every row has same column) with column matrix number to be build. The instance properties are row, column,array and det which are the number of row and column, the array is the array self passed to constructor. The Det property is obvious. The instance methods are _ , x, plus, pow, adj, inv, map, truncate, trans and scalar: the first is a method with integers parameters i,j that is the i,j member of matrix object, the second is the product by another matrix, accept as parameters  matrix objects, plus method adds the object matrix to matrix parameters passed to the method, pow calculates the power of matrix and accepts as parameter the power n (integer), adj calculates the matrix adjoint, inv calculates the matrix inverse, map apply the map over matrix, truncate is a mapping that truncate the matrix's numbers to "n" parameter the digits, trans calculates the matrix transposed  and finally the last  calculates the scalar product with the number passed as parameter to method. The matrix constructor has the class methods adj, det, inv, minor, pscalar, sum, trans, multiply, map and pow that calculates: the adjoint, determinant, inverse, minor, scalar product, sum, transposed, multiplication, mapping, create and power, the parameters of each one are obviously. Every method return a matrix object such way that can be chained another methods.

```js
var Matrix = require('Nsolvejs').matrix;
var matrix =[[0,1.1],[1,4.6]];
var mat = Matrix(matrix);
Matrix(3,5,6); // return a matrix of 5x6 fulfilled with 3
mat.row == 2; // True
mat.column == 2 // True
mat.array ; // [[0,1.1],[1,4.6]]
mat._(1,1) === 0  ; // True
mat._(1) // return a Matrix formed by the first row (1x2 matrix)
mat._(2) // return a Matrix formed by the second row (1x2 matrix)
mat._(undefined,1) // return a Matrix formed by the second column (2x1 matrix) etc
mat._x(mat)
// calculate the direct product
//   [
//      [ 0x0  ,  1.1 x 1.1 ]
//      [ 1x1  ,  4.6 x 4.6 ]
//   
mat.diagonal()
// return the diagonal  like a nx1 matrix :
//   [
//      [ 0 ]
//      [ 4.6]
//    ]
mat.x(mat,mat);// [[5,24.5],[22.3,107.5]] or chained
mat.x(mat).x(mat) // etc
mat.toVectorWithRow() // return a vector formed with the row (up-down)  [0,1.1,1,4.6]   
mat.toVectorWithColumn() // return a vector formed with the columns (right-left)  [0,1,1.1,4.6]  
mat.plus(mat,mat,mat) // [[0,4.4],[4,18.4]] or chained
mat.plus(mat).plus(mat).plus(mat) // etc
mat.truncate(0); //[[0,1],[1,4]]
mat.scalar(0) // [[0,0],[0,0]] or chained
mat.scalar(0).scalar(4)  // etc
mat.pow(2); // [[1.1,5.1],[4.6,22.3]] or chained
mat.pow(2).scalar(2) //[[2.2,10.2],[9.2,44.6]]
mat.filter // works like Array.prototype.filter
          // with the variants filterByPositionRow and filterByPositionColumn
mat._pow(3)
// calculate the direct pow
//   [
//      [ 0^3  ,  1.1^3 ]
//      [ 1^3  ,  4.6^3 ]
//  ]
mat2 = Matrix([
[0,1],
[-1,0]
])
mat.concatRight(mat2)
// concat right
//   [
//      [ 0  ,  1.1 , 0  ,  1]
//      [ 1  ,  4.6 , -1  ,  0]
//   ]
mat.concatLeft(mat)
// concat Left
//   [
//      [ 0  ,  1, 0  ,  1.1  ]
//      [ -1  ,  0, 1  ,  4.6  ]
//   ]
mat.concatDown(mat)
// concat Down
//   [
//      [ 0  ,  1.1 ]
//      [ 1  ,  4.6 ]
//      [ 0  ,  1 ]
//      [ -1  ,  0 ]
//   ]
mat.concatUp(mat)
// concat Up
//   [
//      [ 0  ,  1 ]
//      [ -1  ,  0 ]
//      [ 0  ,  1.1 ]
//      [ 1  ,  4.6 ]
//   ]   
f1 = function (x) { return x/2 ;}
f2 = function (x) { return x/2 ;}
var matrix1 =[[f1, f2]];
var mat1 = Matrix(matrix2);
f3 = function (x) { return 2 ;}
f4 = function (x) { return 3 ;}
var matrix2 =[[f3, f4]];
var mat2 = Matrix(matrix2);
var matrix3 =[[1, 2]];
var mat3 = Matrix(matrix2);
mat1.apply(mat3)
// Left apply
//   [
//      [ f1(1)  ,  f2(2) ]
//   ]
mat1.apply(mat2)
// Left apply
//   [
//      [ f1( f3() )  ,  f2( f4() ) ]
//   ]
mat3.apply(mat1)
// Right apply
//   [
//      [ 1*f1()  ,  2*f2() ]
//   ]
// There are a important and usable variant applyByRow and applyByColumn
// that work on similarly way.
Matrix.zeros(2,2) //[[0,0],[0,0]]
Matrix.ones(2,2) //[[1,1],[1,1]]
Matrix.pow(mat,2) //[[1.1,5.1],[4.6,22.3]]
Matrix.adj(mat) // [[4.6,-1.1],[-1,0]] equivalent mat.adj()
Matrix.adj(mat).scalar(2) // [[9.2,-2.2],[-2,0]]
Matrix.det(mat) // -1.1   equivalent mat.det()
Matrix.inv(mat) // [[-4.2,1],[0.9,0]]  equivalent mat.inv()
Matrix.minor(1,1,mat) // [[4.6]]  equivalent mat.minor(1,1)
Matrix.pscalar(2,mat) // [[0,2.2],[2,9.2]]   equivalent mat.scalar(2)
Matrix.sum(mat,mat,mat,mat,mat) // [[0,5.5],[5,23]]
Matrix.multiply(mat,mat,mat,mat) // [[24.5,108.2],[107.5,518.8]]
Matrix.trans(mat) // [[0,1],[1.1,4.6]]  equivalent mat.trans()
//Exemple of mapping:
mapping = function(item,i,j){return item/(j-i+1)} ;
Matrix.map(mapping,mat) //  equivalent mat.map(mapping)
mat.map(Math.sqrt) //  return a matrix with the Square root over every element
mat.forEach(mapping) // iterate over every matrix's element. The mapping has to receive as params the element and indexes.  

mat.forEachColumn // Like forEach but receive the Columns as argument like nx1 matrix
mat.forEachRow// Like forEach but receive the Rows as argument like 1xn matrix
map_create = function (i,j) { return i*j-1 ;}
//How create a matrix of nxm.
Matrix.create(2,3,map_create)
//    [[0,1,2],
//     [1,3,5]]
// If you pass a number of row and column you can build a matrix different to array given
// the elements are taken cyclically from array given  
var C1= new  Matrix([[2,3],[0]],2,3) //
var C2= new  Matrix([[1,-1],3],3,4)
var C3= new  Matrix([[2,3,2],[0,0,0]])
var C4= new  Matrix([[1,-1,1,-1],[3,3,3,3],[1,-1,1,-1]])
// here C1 and C3 are equivalent mathematically, same to C2 and C4
C1.x(C2) // [ [ 13, 5, 13, 5 ], [ 0, 0, 0, 0 ] ] the same to C3.x(C4)
// you can build a matrix without array, property that is stored as [[]]
var C5 = Matrix(3,4)
// the row and column dimensions are 2 and 3 respectively.
C5.array = [[4,5,6],[2]]
// later is stored the array property and the matrix now is equivalent to:
//  [
//    [ 4, 5, 6, 4 ],
//    [ 2, 2, 2, 2 ],
//     [ 4, 5, 6, 4  ]
// ]
// The column can be different
var C6= new  Matrix([[2,3],[7]],3,[3,4])
// This generates a matrix like
//  [
//    [ 2, 3, 2 ],
//    [ 7, 7, 7, 7 ],
//    [ 2, 3, 2 ]
// ]
// the arrays are converted to column vectors or nx1 matrix
var Matrix([2,3,4,5]) // is equivalent matrix with array
// [
//  [2],
//  [3],
//  [4],
//  [5],
// ]
// If you try make operations with not matrix objects
// they are tried to convert to  matrix.
mat.x(5) // this is equivalent mat.x(Matrix([[5]]))
Matrix({a:21,b:'hola'}).filter([0,1]).toObject() // return {b:'hola'}
// if the param to filter is not a function, is tried to convert to array to generate a matrix Object
// their elements are used like Boolean to make the filter.
// toObject try to convert the matrix to array

var AA = Matrix( [  // You can built a matrix of matrix
[ A, A.scalar( 2.5 ) ],
[ A.x( A ), A.pow( 2 ) ]
] )
assert.equal( AA._( 1, 1, 1, 1 ), A._( 1, 1 ) ) // And obtain the elements of matrix elements with the tensor notation
assert.equal( AA._( 1, 2, 1, 2 ), A.scalar( 2.5 )._( 1, 2 ) )  // true
assert.equal( AA._( 2, 1, 2, 1 ), A.x( A )._( 2, 1 ) )// true
assert.equal( AA._( 2, 2, 2, 2 ), A.pow( 2 )._( 2, 2 ) )// true
```

#### `Nsolvejs.AL.vector(Array)`
Constructor of a vector object with instance property array that is the array self passed as parameter, matrix (Here the vectors are matrixes of nx1) and the instance methods `dot(Vector)` that calculates the dot product, `sum(Vector[,Vector,...])`, `pscalar(Number)` and `cross(Vector)` that calculates the cross product. In another hand the constructor has the class method: `dotp(Vector,Vector)`,  `sum(Vector,Vector[,Vector...])`, `scalarp(Number,Vector)` and `crossp(Vector,Vector[,Vector,...])`. Here the vectors behave as nx1 matrix, because of has all the methods and properties of matrix in matrix property.

```js
var Vector = require('Nsolvejs').vector;
var vector =[0,1.1,5];
var V = Vector(vector);
V.sum(V); // [0,2.2,10] equivalent Vector.sum(V,V)
V.pscalar(2) ; //[0,2.2,10]  equivalent Vector.pscalar(2,V)
V.dot(V); // 26.21  equivalent Vector.dot(V.V)
V.cross(V); // [0,0,0] equivalent Vector.cross(V,V),remember this  
            // operation is only defined for three dimension vectors.
// How create a vector of n dimension.
function mapping(n) {return n*n-4;}
Vector.create(4,mapping) // [-3,0,5,12]
// mapping a vector
function mapp(item,n) {return n*item;}
V.map(mapp);// [0,2.2,15] equivalent Vector.map(mapp,V)
```

#### `Nsolvejs.AL.solveLE(Array,Array)`
Solve the linear equation system:

a_11x_1+a_12 x_2+...a_1n x_n = b_1

.                                              .

.                                              .

.                                              .

a_n1x_1+a_n2 x_2+...a_nn x_n = b_n

to do that is necessary pass the matrix [[a_11,a_12...a_1n]...,[a_n1,a_n2...a_nn]]firstly and the result array [b_1,b_2...,b_n]. Return the array solution for the system [x_1,x_2,...,x_n].

```js
var AL = require('Nsolvejs').AL;
var mat = [[0,1.1,6],[1,4.6,-5],[0.1,0,-0.9]] ;
var result = [5,6,0];
solveLE(mat,result) ; //[6.36,0.68,0.7,]
```

#### `Nsolvejs.regression`
Here is exposed the regression methods using the Least squares criterion,
this a application of Linear Algebra methods.

```js
var data = [
  [3,14],
  [1,40],
  [6,1],
  [3,2]
]
var regression = JNsolve.regression ;
regression('linear',data) // return a object with properties equation and points
// res = { equation: [ 37.50980392156862, -7.156862745098039 ],
//  points: [
// [ 3, 14 ],
// [ 1, 40 ],
// [ 6, 1 ],
// [ 3, 2 ]
// ]
//        }
// linear does a regression like y = a+bx and the values are returned into equation
// property as [a,b]
// other regression availables are:
//  exponential with y = a*e^(bx) returned  into equation as [a,b]
//  logarithmic with y = a+b*log(x) returned  into equation as [a,b]
//  power with y = a*x^b returned  into equation as [a,b]
//  polynomial with y = a_0 + a_1 x + a_2 x^2 + a_3 x^3 .... a_n x^n
//  returned  into equation as [a_0,a_1...,a_n] this regression accept a third
// parameter that is the degree of  polynomial used:
 regression('polynomial',data,2)  //  return
 // { equation: [ 64.19999999999999, -26.933333333333326, 2.7333333333333347 ],
 //  points: [ [ 3, 14 ], [ 1, 40 ], [ 6, 1 ], [ 3, 2 ] ] }

```


#### `Nsolvejs.Stats`
Here is exposed the statistical methods, this a application of Linear Algebra methods.

```js
var data = [
  [3,4,5,2,1,5,6],
  [1,4,0,4,1,5,6],
  [6,4,5,2,1,5,1],
  [3,4,5,5,0,5,4],
  [4,4,5,2,1,5,12],
  [0,4,0,9,1,5,3],
  [6,4,3,2,0,5,6]
]
var stats = new JNsolve.Stats(data) ;
stats.media() // return the matrix with array :
// [
// [ 3.2857142857142856 ],
// [ 4 ],
// [ 3.2857142857142856 ],
// [ 3.714285714285714 ],
// [ 0.7142857142857142 ],
// [ 5 ],
// [ 5.428571428571428 ]
// ]

stats.std() // return the correlation matrix of data
stats.covariance() //  returns the covariance matrix of data
```

### `Numerical analysis`
#### `Nsolvejs.calculusN.D`
Object with differents numerics methods to calculate the derivative of a function.

##### `Nsolvejs.calculusN.D.Nof(Function,Number,Array)`
Constructor that generates the numeric derivative of `Function`=> f(x) with a  `Number` => N given of divisions in an interval  `Array` => [a,b].

```js
Nsolvejs.D.Nof(f,1000,[2,7])
```

##### `Nsolvejs.calculusN.D.Nof.f_x`
Instance method what is the derivative numerical of  `Function` with a   `Number` given of divisions in an interval   `Array`.

```js
Nsolvejs.D.Nof(f,1000,[2,7]).f_x(3)
```

is a aproximation to the derivative of f (df_dx) on 3 with the 1000 divisions in the interval [2,7]. Is available another method that calculate the numerical derivative calculating the dx_i in a optimazed way, dx_i=h/sqrt(1+dfdx^2) with h=(b-a)/N.

##### `Nsolvejs.calculusN.D_opt.Nof(Function,Number,Array)`
##### `Nsolvejs.calculusN.D_opt.Nof.f_x`
##### `Nsolvejs.calculusN.D.linear_interpolation(Array)`
Is a constructor that generates the numeric linear interpolation of data given in `Array`= [[x_1,y_2],[x_2,y_3],...[x_n,y_n]] in the interval [x_1,x_n].

```js
array_to_interpolate = [[0,3.2],[1,4.6],[2,5.1],[4,6.9]] ;
Nsolvejs.calculusN.D.linear_interpolation(array_to_interpolate)
```

##### `Nsolvejs.calculusN.D.linear_interpolation(Array).function_interpolated`
Is a instance method what is the interpolated function of `Array` given.

```js
Nsolvejs.D.linear_interpolation(array_to_interpolate).function_interpolated(2.5)
```

Is a aproximation interpolated to the `Array` = [[0,3.2],[1,4.6],[2,5.1],[4,6.9]].

#### `Nsolvejs.nsolveqn(Function, Array[,Number,Object])`
Is a method that calculate numerically the solution of `Function`=>f(x)=0 try in the interval (`Array`=>[a,b]) beginning  on `Number`=>x_0 (initial point).

```js
function f(x) {
  return x-Math.cos(x) ;
}
Nsolvejs.nsolveqn(f,0.5,[0,1]) = 0.73952
```

The `Object`is default options and are { npoints_DNumeric : 1000, presicion : 0.001 , nstepsmax : 1000 , method : 'Newton_Rapshon' }. The mothods available are RegulaFalsi, bisection,fixedpoint,Newton_Raphson_Higherorder, Newton_Raphson. The rest of routines for every method are availables:

#### `Nsolvejs.calculusN.RegulaFalsi(Function,Array[,Object])`
#### `Nsolvejs.calculusN.bisection(Function, Array[,Object])`
#### `Nsolvejs.calculusN.fixedpoint(Function,Number[,Object])`
#### `Nsolvejs.calculusN.Newton_Raphson(Function,Array[, Number, Object])`
#### `Nsolvejs.calculusN.Newton_Raphson_Higherorder(Function,Array[, Number, Object])`
in every case if x_0 is undefined, is taken from a random number  in interval `Array`=>[a,b]. All these methods return a object with properties Root, numSteps and method used.

#### `Nsolvejs.calculusN.findroot(Function, Array[,Number,Object])`
Is a method that calculate numerically the solution of `Function`=>f(x)=0 try in the interval (`Array`=>[a,b]) beginning  on `Number`=>x_0 (initial point).

```js
Nsolvejs.calculusN.findroot(f,0.5,[0,1]) = 0.73952
```

The `Object`is default options and are { npoints_DNumeric : 1000, precision : 0.001 , nstepsmax : 1000 , method : 'Newton_Rapshon' }. Here, findroot try find the root of function by all methods availables in the module.

### `Data Fitting`
#### `Nsolvejs.fit.best(Array[,Array,Array,Object,Function])`
![Plot Data with Best fit](./plots/plotdata.png)

Calculate the best fit using the first `Array`= [[x_1,y_1,z_1...],[x_2,y_2,z_2...],...[x_n,y_n,z_n,...]] argument as data input (if the fit is already calculated before you can pass it instead), the second  `Array` = [z_1,z_2...z_m] argument are the values of x's for which is necessary calculate their y`s values respectively, the third argument are the values of "y" for which is queried the values of "x". The properties of options object are smoothing (default = True), noiseeliminate (default = True), smoothingmethod (default ='exponential' only by moment), alpha (default = 0.8) and fits_name (the fits function) to use: the availables function are inverse (a/(b+x)), linear (ax+b), exponential (a_e^(bx)), logarithmic (a+b Log(x)), polynomial (ax^2+bx+c), sqrt (a_ sqrt(x)+b) and power (ax^b), if not specified take all function availables, using (array) property specified wich column of data in Array is taken to do the fist. The noiseeliminate method eliminate data that are beyond of 3.5 standard deviation from mean[(99.95 % Reliability if data have a normal distribution)](http://onlinestatbook.com/2/calculators/normal_dist.html), does that make a loop filter until that not one data is out of this limit. Return a object with the properties: ans_ofY,ans_ofX, fitUsed, fitEquationUsed, fitParamsUsed, fitPointsUsed, fitWithError and fit. The last parameter is a callback function that receive as only parameter the fit self.

```js
array_to_fit =[[0,4,40],[1,-2,48],[3,9,56],[4,120,70]];
array_of_x = [3.4, 4.8, 8, 11] ;
array_of_y = [75,83,99,105];
Nsolvejs.bestfit(array_to_fit,array_of_x,array_of_y );
 fit = { ans_ofY:
   [ [ 3.4, 61.41945099444754 ],
     [ 4.8, 77.93133160533434 ],
     [ 8, 202.14957607090903 ],
     [ 11, -408.9420392173956 ] ],
  ans_ofX:
   [ [ 4.596464057224314, 75 ],
     [ 5.118019106548409, 83 ],
     [ 5.908254029766733, 99 ],
     [ 6.142502239149309, 105 ] ],
  fitOptions:
   { smoothing: true,
     noiseeliminate: false,
     smoothingmethod: 'exponential',
     alpha: 0.9,
     fits_name: [ 'sqrt', 'inverse' ],
     using: [ 0, 2 ] },
  fitUsed: 'inverse',
  fitEquationUsed: 'y = -405.84/(x - 10.01)',
  fitParamsUsed: [ -405.8350227553108, -10.007597693961792 ],
  fitPointsUsed: [ [ 0, 40 ], [ 1, 47.2 ], [ 3, 55.12 ], [ 4, 68.512 ] ],
  fitWithError: 2.05844894339866,
  fit:
   { sqrt: { regression: [Object], error: 3.4369281428656664 },
     inverse: { regression: [Object], error: 2.05844894339866 },
     best: { name: 'inverse', error: 2.05844894339866, f: [Function] } } }
```


[![Throughput Graph](https://graphs.waffle.io/4yopping/Nsolvejs/throughput.svg)](https://waffle.io/4yopping/Nsolvejs/metrics)

## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.  For any bugs report please contact to me via e-mail: cereceres@ciencias.unam.mx.

## Licence
The MIT License (MIT)

Copyright (c) 2015 Jesús Edel Cereceres with Andrés González and Marco Godínez as collaborators, 4yopping and all the related trademarks.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
