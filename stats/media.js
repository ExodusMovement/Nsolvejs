'use strict'
var Matrix = require('../algebraL/Mat');
function media() {
  var unitData = Matrix.create(this.ndata,1,function () {return 1})
  var data = this.dataMatrix()
  return unitData.trans().x(data).x(1/this.ndata).trans()
}
module.exports = function (cb) {
  var self = this
  if (cb && typeof cb === 'function') {
    return new Promise(function(full,rej){
      try {
        full(cb.call(self,null,media.call(self)))
      } catch (e) {
        rej(cb.call(self,e,null))
      }
    }
 )
  } else {
    return media.call(self) ;
  }
};
