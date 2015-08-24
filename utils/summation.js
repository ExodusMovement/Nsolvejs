'use strict';
module.exports = function(j,n,callback) {
  var sum = 0;
  for (var i = j; i <=n ; i++) {
    sum += callback(i);
  }
  return sum ;
};
