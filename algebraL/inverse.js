'use strict' ;
var  det = require('./det'),
     pscalar = require('./pscalar'),
     adj = require('./adj');

/** @function
 * The inverse matrix.
 * @param  {Object} matrix
 * @return {Object} matrix
 */
function inverse(B){
       if (!B) { return ;}
       var dett,adjj;
       if(  B.raw === B.column ){
         dett = det(B);
         adjj= adj(B);
         if (dett !== 0) {
         return pscalar(1/dett,adjj);
         }
       }
     }

     module.exports = function (B,cb) {
       if (cb && typeof cb === 'function') {
         setImmediate(function () {
           cb(inverse(B));
         });
       } else {
         return inverse(B) ;
       }
     };
