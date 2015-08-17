'use strict' ;
var  matrix = require('./Mat'),
     Det = require('./det'),
     Pscalar = require('./pscalar'),
     Adj = require('./adj');

/** @function
 * The inverse matrix.
 * @param  {Object} matrix
 * @return {Object} matrix
 */
     module.exports =function (B){
       var det,adj;
       if(  B.raw === B.column ){
         det = Det(B);
         adj = Adj(B);
         if (det !== 0) {
         return Pscalar(1/det,adj);
         }
       }
     };
