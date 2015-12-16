'use strict';
/** @function
 * Generates a array from a object with the pattern [[key,value]]
 * @param {Object} obj.
 * @return {Array}
 */
function toArray(obj, opt) {
  opt = opt || {
    deep: true
  }
  opt.deep = opt.deep === undefined ? true : opt.deep
  let Matrix = require('./Mat')
  let array = []
  for (var variable in obj) {
    if (obj.hasOwnProperty(variable)) {
      array.push([variable, (typeof obj[variable] === 'object') && !Array.isArray(obj[variable]) ?
        opt.deep ? toArray(obj[variable], opt) : obj[variable] :
        Array.isArray(obj[variable]) && opt.deep ?
        new Matrix(obj[variable]) :
        obj[variable]
      ])
    }
  }
  return array
}
module.exports = toArray
