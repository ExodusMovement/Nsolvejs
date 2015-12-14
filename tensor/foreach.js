'use strict' ;
/** @function
 * Function iterating over elements of  Tensor object with params the item and indexs.
 * @param {Function} map whose params are the item and Tensor's indexs.
 */
function  foreach(map,B){
  if (!map || !B) { return ;}
var Tensor = require( './create' );
if ( !( B instanceof Tensor ) ) {
 B = new Tensor( B )
}
if (typeof map === 'function') {
 var i, ii = B._fac
 for ( i = 1; i <= ii; i++ ) {
   map.call(B,B._(i),i)
 }
  return  this;
}
}
module.exports = function (map,B,cb) {
  if (cb && typeof cb === 'function') {
    return new Promise(function(full,rej){
      try {
        full(cb.call(B,null,foreach(map,B)))
      } catch (e) {
        rej(cb.call(B, e,null ) )
      }
    }
 )
  } else {
    return foreach.call(this,map,B) ;
  }
};
