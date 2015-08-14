'use strict' ;
    /** @constructor
     * Constructor of a matrix.
     * @param {Array}
     */
module.exports =   function (array) {
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
