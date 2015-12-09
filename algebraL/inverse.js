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
       var Matrix = require('./Mat');
       if (!(B instanceof Matrix) && Array.isArray(B)) {B = Matrix(B)}
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
         return new Promise(function(full,rej){
           try {
             full(cb(null,inverse(B)))
           } catch (e) {
             rej(cb(e))
           }
         }
      )
       } else {
         return inverse(B) ;
       }
     };
