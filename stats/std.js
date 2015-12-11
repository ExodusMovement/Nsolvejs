'use strict'
function correlationMatrix() {
  var media = this.media()
  var data = this.dataMatrix()
  data =  data.map(function (item,i,j) {
    return item - media._(j,1)
  })
  return data.trans().x(data).x(1/(this.ndata-1)).map(Math.sqrt)
}


module.exports = function (cb) {
  var self = this
  if (cb && typeof cb === 'function') {
    return new Promise(function(full,rej){
      try {
        full(cb.call(self,null,correlationMatrix.call(self)))
      } catch (e) {
        rej(cb.call(self,e,null))
      }
    }
 )
  } else {
    return correlationMatrix.call(self) ;
  }
};
