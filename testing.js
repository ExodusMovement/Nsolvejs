'use strict';
var growth = require('./fit/bestfit'),
    nsolve = require('./index'),
    findroot = require('./lib/findroot'),
    map = require('./algebraL/map'),
    product = require('./algebraL/product');


var test_array= [[0,40],[1,48],[3,56],[4,70]];
     var test_query = [3.4, 4.8, 8, 11] ;
     var test_y     = [75,83,99,105] ;

     var array1 = [[0.8,0.5],
                   [0.2,0.5]];

     var array2 = [[0.66],
                   [0.34]],
     A= new nsolve.AL.matrix(array1),
     B= new nsolve.AL.matrix(array2),
     V1= new nsolve.AL.vector([1,2,3]),
     V2= new nsolve.AL.vector([0,-1,1]);
function f(x) {
  return   Math.cos(x)-x;
}

var initialpoint =  0.5 ;
    var interval =  [-3,5] ;


//console.log(
  //'Solve the equation x⁵-16x⁴+2x³-20x²+6x-7-1.6 e^(-4x²) = 0 with initial point random selected  in an interval [-100,100] with a number maximum of steps of 1000 and 1000 partitions on the calculus of numerical derivative.'
//);
//console.log('=> regulafalsi =', nsolve.calculusN.regulafalsi(f,interval));
//console.log('=> bisection =', nsolve.bisection(f,interval));

//console.log('=> fixedpoint =', nsolve.calculusN.fixedpoint(f,initialpoint));

//console.log('=> Newton_Raphson =', nsolve.calculusN.Newton_Raphson(f,interval,9));

//console.log('=> Newton_Raphson_Higherorder =', nsolve.calculusN.Newton_Raphson_Higherorder(f,interval));
//console.log('=> fit =', growth(test_array,test_query,test_y));
//console.log('=> adj =',nsolve.AL.matrix.adj(A).array );

//console.log('=> pow =',nsolve.AL.matrix.pow(A,2).array );

//console.log('=> multiply =',nsolve.AL.matrix.multiply(A,A).array );

//console.log('=> product =', product(A,A).array );

//console.log('=> pscalar =',nsolve.AL.matrix.pscalar(3,A).array );

//console.log('=> sum =',nsolve.AL.matrix.sum(A,A).array );

//console.log('=> trans =',nsolve.AL.matrix.trans(A).array );

//console.log('=> inv =',nsolve.AL.matrix.inv(A).array );

//console.log('=> comprobacion_inv =',product(nsolve.AL.matrix.inv(A),A).array );

console.log('=> pow =',V1.map(f));

//console.log('=> nsolveqn =', nsolve.nsolveqn(f,interval,initialpoint));


//console.log('=> findroot =', findroot(f,interval,initialpoint));
