'use strict';
module.exports = function (A,B) {
  return  A.matrix.trans().x(B.matrix).array[0][0];
};
