'use strict';
function sum(j,n,map) {
  var sum = 0;
  for (var i = j; i <=n ; i++) {
    sum += map(i);
  }
  return sum ;
}

module.exports = function (j,n,map,cb) {
  if (cb && typeof cb === 'function') {
    setTimeout(function () {
      cb(sum(j,n,map));
    });
  } else {
    return sum(j,n,map) ;
  }
};
