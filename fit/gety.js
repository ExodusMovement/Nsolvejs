'use strict';
/**@function
 * This function that evaluate f(x_i).
 * @param {function} h, {Array} get_y.
 * @return {Array} values of "x".
 */
module.exports = function (f,get_y) {
   get_y = get_y || [] ; var  array_y=[],j,
   length_query = get_y.length ;
  // Calculate the values of "y" using get_y.
  for (j = 0; j < length_query; j++){
  array_y[j]  = [] ;
  array_y[j][1] = f(get_y[j]) ;
  array_y[j][0] = get_y[j];
  }
  return array_y ;
};
