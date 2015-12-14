'use strict';
/** @function
 * Generates a array from a object with the pattern [[key,value]]
 * @param {Object} obj.
 * @return {Array}
 */

module.exports = function (array) {
  let obj = {}
  for (var i = 0; i < array.length; i++) {
    if (Array.isArray(array[i]) && array[i].length) {
      obj[array[i][0]] = array[i].length > 2 ?
        array[i].slice[1] :
        array[i].length === 1 ? array[i][0] : array[i][1]
    } else if(array[i].length) {
      obj[i] = array[i]
    }

  }
  return obj
}
