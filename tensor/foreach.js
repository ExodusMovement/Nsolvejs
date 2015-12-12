'use strict' ;
var Matrix = require('./Mat');
/** @function
 * Function iterating over elements of  matrix object with params the item and indexs.
 * @param {Function} map whose params are the item and matrix's indexs.
 */
function  foreach(map,B){
       if (!B || !map ) { return ;}
       if (!(B instanceof Matrix) && Array.isArray(B)) {B = Matrix(B)}
       if(typeof map === 'function'  ){
         var ii=B.row,kk=B.column,array = [],i,k ;
         for (i=1 ;i<=ii;i++){
           array[i-1]=[];
           for (k=1 ;k<=kk;k++){
            map(B._(i,k),i,k) ;
           }
         }
       }
}
module.exports = function (map,B,cb) {
  if (cb && typeof cb === 'function') {
    return new Promise(function(full,rej){
      try {
        full(cb(null,foreach(map,B)))
      } catch (e) {
        rej(null,cb(e))
      }
    }
 )
  } else {
    return foreach(map,B) ;
  }
};
