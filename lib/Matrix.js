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
var A= new matrix([[3,1,-1],
              [2,-2,0],[1,2,-1]]),
    B= new matrix([[1,2,-1],
                  [0,-3,2],[2,1,5]]) ;


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
  if(typeof m === 'number' && typeof n === 'number'&& B instanceof  matrix&&  0<m && m <= B.raw && 0<n && n <= B.column ){
    var ii=B.raw,array,i ;
    array = _.clone(B.array,true);
    for (i=1 ;i<=ii;i++){
          array[i-1].splice(n-1,1);
    }
    array.splice(m-1,1);
    return  new matrix(array);
  }
}


function  Det(B){
  var det;
  if( B instanceof  matrix && B.raw === B.column &&  B.raw >= 0 ){
    if(B.raw >2){
      var ii=B.column,i, arrayminor=[] ;
      det = 0 ;
      for (i=1 ;i<=ii;i++){
        arrayminor[i-1]= Minor(1,i,B);
      det += Math.pow(-1,1+i)*Det(arrayminor[i-1]) ;
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
}


function  Inv(B){
  var det,adj;
  if( B instanceof  matrix && B.raw === B.column ){
    det = Math.abs(Det(B));
    adj = Adj(B);
    if (det !== 0) {
    return Pscalar(1/det,adj);
    }
  }
}
function  Adj(B){
  if(B instanceof  matrix && B.raw === B.column ){
    var ii=B.raw,kk=B.column,array = [],i,k ;
    for (i=1 ;i<=ii;i++){
      array[i-1]=[];
      for (k=1 ;k<=kk;k++){
          array[i-1][k-1]=Math.pow(-1,i+k)*Det( Minor(i,k,B) );
      }
    }
    return  Trans(new matrix(array));
  }
}
console.log('AB=',Product(A,B).array);
console.log('A+B=',sum(A,B).array);
console.log('alpha*B=',Pscalar(2,B).array);
console.log('Trans(B)=',Trans(B).array);
console.log('Minor(B)=',Minor(1,1,B).array);
console.log('Det(B)=',Det(B));
console.log('Adj(B)=',Adj(B).array);
console.log('Inv(B)=',Inv(B).array);
console.log('comprobacion=',Product(B,Inv( B )).array);
