  'use strict';
  /**@module
   * nsolvejs module, with all the properties defined into the proyect.
   */
    var methodN = require('./lib/methodN'),
    bestfit = require('./fit/bestfit'),
    matrix  = require('./algebraL/Mat'),
    solveLE  = require('./algebraL/solveLE'),
    vector  = require('./algebraL/vector'),
    stats =  require('./stats/stats')


     /**@function
      * The function that solve the equation g(x)=0 beginning in initialpoint into a interval using the options given.
      * @param {Function} g {array} interval {number} initialpoint
      * {Object} options
      * @return {object} with the solution found.
      */
  var nsolveqn  =  function (g,interval,initialpoint,options) {
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
nsolveqn.fit = {best : bestfit} ;

nsolveqn.calculusN = {
  Newton_Raphson :methodN.Newton_Raphson,
  bisection : methodN.bisection,
  fixedpoint : methodN.fixedpoint,
  regulafalsi : methodN.regulafalsi ,
  Newton_Raphson_Higherorder :methodN.Newton_Raphson_Higherorder,
  findroot : require('./lib/findroot'),
  D : require('./lib/derivativeN'),
  D_opt : require('./lib/derivativeNopt'),
};
nsolveqn.AL ={
  matrix :matrix ,
  solveLE : solveLE,
  vector : vector
};

nsolveqn.Stats = stats

nsolveqn.utils = require('./utils/utils');

module.exports = nsolveqn
