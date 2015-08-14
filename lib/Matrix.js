'use strict' ;
var _ = require('lodash') ;

    /** @constructor
     * Constructor that define the numeric derivative of f(x) using npoints
     * in interval ([a,b]).
     * @param {Function} f {Number} npoints {Array} interval.
     */
var matrix=  function (array) {
    var length = array.length,i ,first_lenght = array[0].length ;
    var test = length || first_lenght;
    for (i=0 ;i<length;i++){
      if(array[i].length !== first_lenght){ test = false;}
    }
    if(test){
      this._ = function (i,j) {
      return array[i-1][j-1];
      };
      this.raw =length ;
      this.column = first_lenght ;
      this.array = array;
    }

};

function  Product(A,B){
  if(A instanceof matrix && B instanceof  matrix && A.column === B.raw){
    var ii=A.raw,jj=A.column,kk=B.column,array = [],i,j,k ;
    for (i=1 ;i<=ii;i++){
      array[i-1]=[];
      for (k=1 ;k<=kk;k++){
        array[i-1][k-1]=0 ;
        for (j=1 ;j<=jj;j++){
          array[i-1][k-1]=array[i-1][k-1]+A._(i,j)*B._(j,k);
        }
      }
    }
    return  new matrix(array);
  }
}
var A= new matrix([[2,3,5],
                [1,1,3],
                [0,1,0]]),
    B= new matrix([[3,1,2],
                [-1,2,-1],
                [-2,1,0]]) ;


function  sum(A,B){
  if(A instanceof matrix && B instanceof  matrix && A.column === B.column && A.raw === B.column ){
    var ii=A.raw,kk=B.column,array = [],i,k ;
    for (i=1 ;i<=ii;i++){
      array[i-1]=[];
      for (k=1 ;k<=kk;k++){
          array[i-1][k-1]=A._(i,k)+B._(i,k);
      }
    }
    return  new matrix(array);
  }
}

function  Pscalar(alpha,B){
  if(typeof alpha === 'number' && B instanceof  matrix ){
    var ii=B.raw,kk=B.column,array = [],i,k ;
    for (i=1 ;i<=ii;i++){
      array[i-1]=[];
      for (k=1 ;k<=kk;k++){
          array[i-1][k-1]=alpha*B._(i,k);
      }
    }
    return  new matrix(array);
  }
}


function  Trans(B){
  if(B instanceof  matrix ){
    var ii=B.column,kk=B.raw,array = [],i,k ;
    for (i=1 ;i<=ii;i++){
      array[i-1]=[];
      for (k=1 ;k<=kk;k++){
          array[i-1][k-1]=B._(k,i);
      }
    }
    return  new matrix(array);
  }
}

function  Minor(m,n,B){
  if(typeof m === 'number' && typeof n === 'number'&& B instanceof  matrix
    &&  0<m && m <= B.raw && 0<n && n <= B.column ){
    var ii=B.raw,array,i ;
    array = _.clone(B.array,true);
    for (i=1 ;i<=ii;i++){
          array[i-1].splice(n-1,1);
    }
    array.splice(m-1,1);
    return  new matrix(array);
  }
}

console.log('AB=',Product(A,B).array);
console.log('A+B=',sum(A,B).array);
console.log('alpha*B=',Pscalar(2,B).array);
console.log('Trans(B)=',Trans(B).array);
console.log('Minor(B)=',Minor(1,1,B).array);
