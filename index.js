'use strict' ;
 var D =         require('./lib/derivativeN'),
  D_opt =         require('./lib/derivativeN'),
  methodN =    require('./lib/methodN'),
  regulafalsi =  methodN.regulafalsi,
  fixedpoint =   require('./lib/fixedpoint'),
  bisection =    methodN.bisection,
  Newton_Raphson = methodN.Newton_Raphson,
  bestfit = require('./fit/bestfit'),
  Newton_Raphson_Higherorder = methodN.Newton_Raphson_Higherorder,
  findroot  = require('./lib/findroot')  ,
    adj =require('./algebraL/adj'),
    det =require('./algebraL/det'),
    inv =require('./algebraL/inverse'),
    matrix = require('./algebraL/Matriz'),
    minor = require('./algebraL/minor'),
    product  = require('./algebraL/product'),
    pscalar  = require('./algebraL/pscalar'),
    solveLE  = require('./algebraL/solveLE'),
    sum = require('./algebraL/sum'),
    trans = require('./algebraL/trans');


  module.exports.nsolveqn  =  function (g,interval,initialpoint,options) {
    if(!g){return ;}
    options = options || {npoints_DNumeric : 1000, presicion : 0.001 , nstepsmax : 1000 , method : 'Newton_Raphson' } ;
    options.presicion = options.presicion || 0.001 ;
    options.npoints_DNumeric = options.npoints_DNumeric || 1000 ;
    options.nstepsmax = options.nstepsmax || 1000 ;
    options.method = options.method || 'Newton_Raphson';
      //  var presicion = options.presicion ;
        var method = options.method ;
        return  methodN[method](g,interval,initialpoint,options);
};
module.exports.fit = {best : bestfit} ;

module.exports.calculusN = {
  Newton_Raphson : Newton_Raphson,
  bisection : bisection,
  fixedpoint : fixedpoint,
  regulafalsi : regulafalsi ,
  Newton_Raphson_Higherorder : Newton_Raphson_Higherorder,
  findroot : findroot,
  D : D,
  D_opt : D_opt
};
module.exports.AL ={
  adj :adj,
  det :det,
  inv :  inv ,
  matrix :matrix ,
  minor :minor,
  product :product,
  pscalar :pscalar ,
  solveLE :solveLE,
  sum :sum,
  trans :trans
};
