'use strict';
/** @function
 * Builder of a tensor
 * @param {Number} n {Number} m {Function} mapping .
 * @return {Object} vector
 */
 function create(a,b,c,d,e) {
   n = arguments.length
   console.log(a,b,c,d,e.n);
}

module.exports = function () {
	let l = arguments.length
	console.log('arguments=',arguments);
	if (typeof arguments[l-1] === 'function') {
		let cb = arguments[l-1]
		var arg = Array.prototype.slice.call(arguments,0,l-1)
		console.log('arg ==',arg,'cb=',cb);
		return new Promise(function(full,rej){
			try {
				full(cb(null,create(arg)))
			} catch (e) {
				rej(cb(e))
			}
		}
 )
	} else {
		return create(arguments)
	}
}


console.log(Object.keys(Array.prototype));


module.exports(1,2,4,5,'string',function () {

})
