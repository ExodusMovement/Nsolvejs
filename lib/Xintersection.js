'use strict';
/**@function
 * Find the x's intersection of a line that pass by A and B.To do this is necessary give the points A and B which are objects with properties x and y
 * @param {Object} A {Object} B.
 * @return {Number} the x's intersection of line through A and B.
 */
module.exports = function (A, B) {
    return A.x - A.y * (B.x - A.x) / (B.y - A.y);
};
