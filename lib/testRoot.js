'use strict';
var xintersection = require('./Xintersection');
/**@function
 * This function implements the  to find a numerical root of f (x). To do this is necessary give the points A and B which are objects with properties x and y, the function to test and presicion to be fulfilled.
 * @param {Object} A {Object} B {function} f {Number} presicion.
 * @return {Number} the root of equation f(x)=0 if presicion is fulfilled.
 */
module.exports = function (A, B, f, presicion) {
    // Find the x's intersection of a line through A and B.
    var x = xintersection(A, B),
        y = f(x);
    // test if is the root.
    if (Math.abs(y) <= presicion) {
        return x;
    }
    var test = A.y * y < 0;
    if (test) {
        B.x = x;
        B.y = y;
    } else {
        A.x = x;
        A.y = y;
    }
};
