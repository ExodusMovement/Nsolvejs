'use strict';
/** @function
 * Generates a array from a object with the pattern [[key,value]]
 * @param {Object} obj.
 * @return {Array}
 */

module.exports = function (obj) {
  let array = []
  for (var variable in obj) {
    if (obj.hasOwnProperty(variable)) {
      array.push([variable, obj[variable]])
    }
  }
  return array
}
