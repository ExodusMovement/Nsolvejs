'use strict';
var fs = require('fs'),
async = require('async');

var writeFile = function (path,array) {
  fs.writeFileSync(path,'\n');
  array.forEach(function (item) {
  fs.appendFileSync(path,item[0].toString()+' '+item[1]+'\n');
});
};
module.exports = writeFile;
