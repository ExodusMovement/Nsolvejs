'use strict' ;
/** @function
 * Mapping the matrix object with a function given.
 * @param {Function} map {Object} matrix.
 * @return {Object} matrix
 */
function  mapp(map,B){
       if (!map || !B) { return ;}
       var Matrix = require('./Mat');
       if (!(B instanceof Matrix) && Array.isArray(B)) {B = Matrix(B)}
       if(typeof map === 'function'  ){
         var ii=B.row,kk=B.column,array = [],i,k ;
         for (i=1 ;i<=ii;i++){
           array[i-1]=[];
           for (k=1 ;k<=kk;k++){
               array[i-1][k-1]=map(B._(i,k),i,k) ;
           }
         }
         var Matrix = require('./Mat');
         return  new Matrix(array);
       }
}
module.exports = function (map,B,cb) {
  if (cb && typeof cb === 'function') {
    return new Promise(function(full,rej){
      try {
        full(cb(null,mapp(map,B)))
      } catch (e) {
        rej(cb(e))
      }
    }
 )
  } else {
    return mapp(map,B) ;
  }
};
