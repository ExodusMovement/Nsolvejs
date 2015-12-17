'use strict';
var regulafalsi = require('./regulafalsi'),
    fixedpoint = require('./fixedpoint'),
    bisection = require('./bisection'),
    Newton_Raphson = require('./Newton_Raphson'),
    Newton_Raphson_Higherorder = require('./Newton_Raphson_Higherorder');
/** @object
 * Define all the numeric methods that are availables in the module.
 */
module.exports = {
    Newton_Raphson_Higherorder: Newton_Raphson_Higherorder,
    Newton_Raphson: Newton_Raphson,
    fixedpoint: fixedpoint,
    regulafalsi: regulafalsi,
    bisection: bisection
};
