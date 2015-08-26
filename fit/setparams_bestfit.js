'use strict';
module.exports = function (get_y, get_x,options,callback) {
  if(get_x.length === undefined ){options = get_x ; get_x = undefined;}
  if(get_y.length === undefined ){ options = get_y ; get_y = undefined;}
  if(typeof options ==='function'){callback = options ; options = undefined;}
  options = options ||
  {smoothing : false, noiseeliminate : false,
  smoothingmethod :'exponential',alpha : 0.8,
  fits_name:['linear','exponential','logarithmic','power','polynomial','inverse','sqrt']} ;
  if(options.smoothing === undefined){options.smoothing = false ;}
  if(options.noiseeliminate === undefined){options.noiseeliminate = false;}
  options.smoothingmethod = options.smoothingmethod || 'exponential' ;
  options.alpha = options.alpha || 0.8 ;
  options.fits_name = options.fits_name ||['linear','exponential','logarithmic','power','polynomial','inverse','sqrt'];
};
