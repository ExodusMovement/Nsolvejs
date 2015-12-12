'use strict' ;
/** @function
 * Mapping the matrix object with a function given.
 * @param {Function} map {Object} matrix.
 * @return {Object} matrix
 */
function  mapp(map,B){
       if (!map || !B) { return ;}
       var Matrix = require('./Mat');
       if (!(B instanceof Matrix)) {B =new Matrix(B)}
       if(typeof map === 'function'  ){
         var ii=B.row,kk,array = [],i,k ;
         for (i=1 ;i<=ii;i++){
           array[i-1]=[];
           kk = B.getColumn(i)
           for (k=1 ;k<=kk;k++){
               array[i-1][k-1]=map(B._(i,k),i,k) ;
           }
         }
         return  new Matrix(array);
       }
}
module.exports = function (map,B,cb) {
  if (cb && typeof cb === 'function') {
    return new Promise(function(full,rej){
      try {
        full(cb(null,mapp(map,B)))
      } catch (e) {
        rej(null,cb(e))
      }
    }
 )
  } else {
    return mapp(map,B) ;
  }
};
