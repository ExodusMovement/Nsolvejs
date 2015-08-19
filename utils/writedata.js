'use strict';
var fs = require('fs'),
async = require('async');

var writeFile = function (path,array,callback) {
  fs.writeFileSync(path,'\n');
  async.each(array,function (item) {
  fs.appendFile(path,item[0].toString()+' '+item[1]+'\n');
},callback);
};
module.exports = writeFile;
