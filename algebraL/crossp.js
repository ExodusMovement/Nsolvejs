'use strict';
    var levicivita = require('./levi_civita');

module.exports = function (A,B) {
    var Vector= require('./vector');
    var i,j,k,array=[];
    for ( i = 0; i<3; i++){
      array[i]=0;
      for ( j = 0; j< 3; j++) {
        for ( k = 0; k<3; k++) {
          array[i] =array[i]+ A.array[j][0]*B.array[k][0]*levicivita[i][j][k];
        }
      }
    }
    return new Vector(array);
};