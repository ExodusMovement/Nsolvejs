'use strict' ;
var matrix = require('./Matriz'),
     Minor = require('./minor');

/** @function
 * The determinat of matrix.
 * @param  {Object} matrix.
 * @return {Number} determinant.
 */
  var    Det = function (B){
       var det;
       if( B instanceof  matrix && B.raw === B.column &&  B.raw >= 0 ){
         if(B.raw >2){
           var ii=B.column,i, arrayminor=[] ;
           det = 0 ;
           for (i=1 ;i<=ii;i++){
             arrayminor[i-1]= Minor(1,i,B);
           det += Math.pow(-1,1+i)*Det(arrayminor[i-1])*B._(1,i) ;
           }
         }else{
           if (B.raw ===2) {
             det = B._(1,1)*B._(2,2)-B._(1,2)*B._(2,1);
           } else {
           det = B._(1,1) ;
           }
         }
         return  det;
       }
     };
module.exports = Det ;
