  'use strict';
  var methodN =    require('./lib/methodN'),
  bestfit = require('./fit/bestfit'),
    matrix  = require('./algebraL/Mat'),
    solveLE  = require('./algebraL/solveLE'),
    vector  = require('./algebraL/vector');


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
  Newton_Raphson :methodN.Newton_Raphson,
  bisection : methodN.bisection,
  fixedpoint : methodN.fixedpoint,
  regulafalsi : methodN.regulafalsi ,
  Newton_Raphson_Higherorder :methodN.Newton_Raphson_Higherorder,
  findroot : require('./lib/findroot'),
  D : require('./lib/derivativeN'),
  D_opt : require('./lib/derivativeNopt'),
};
module.exports.AL ={
  matrix :matrix ,
  solveLE : solveLE,
  vector : vector
};

module.exports.utils = require('./utils/utils');
