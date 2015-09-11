'use strict' ;
/** @function
 * Function iterating over elements of  matrix object with params the item and indexs.
 * @param {Function} map whose params are the item and matrix's indexs.
 */
function  foreach(map,B){
       if (!B || !map ) { return ;}
       if(typeof map === 'function'  ){
         var ii=B.raw,kk=B.column,array = [],i,k ;
         for (i=1 ;i<=ii;i++){
           array[i-1]=[];
           for (k=1 ;k<=kk;k++){
            map(B._(i,k),i,k) ;
           }
         }
       }
}
module.exports =function (map,B,cb) {
  if (cb && typeof cb === 'function') {
    setImmediate(function () {
      cb(foreach(map,B));
    });
  } else {
    return foreach(map,B) ;
  }
};
