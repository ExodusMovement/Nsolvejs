'use strict';
var _ = require('lodash'),
    fn = require('./fitf(x)'),
    betterfit = require('./betterfit');
/** @function
 * This function elimanate the noise of  a set of datas given. The arraynoisy have to be like [[t_1,x_1],[t_2,x_2]...].
 * @param {Array} arraynoisy {object} fit.
 * @return {Array} arrayflattened.
 */
var flatted = function (arraynoisy, _fit) {
    var fit = _.clone(_fit, true);
    var sigma = fit.best.error,
        fits_name = fit.fitOptions.fits_name,
        l = arraynoisy.length,
        f = eval(fn(fit.best.name, fit[fit.best.name].regression.equation));
    var i, limit, arrayflattened, error, x, n = 1;
    arrayflattened = _.clone(arraynoisy, true);
    // Dispersion limit
    limit = 3.5 * sigma;
    //Loop to filter noisy data.
    while (n !== 0) {
        i = 0;
        while (arrayflattened[i]) {
            x = arrayflattened[i][0];
            error = Math.abs(arrayflattened[i][1] - f(x));
            if (error >= limit) {
                arrayflattened.splice(i, 0);
                n++;
                i--;
            }
            i++;
        }
        n--;
        fit = betterfit(arrayflattened, fits_name);
        f = eval(fn(fit.best.name, fit[fit.best.name].regression.equation));
        sigma = fit.best.error;
        limit = 3.5 * sigma;
    }
    if (l !== arrayflattened.length) {
        arrayflattened = _.clone(flatted(arrayflattened, fit), true);
    }
    return arrayflattened;
};
module.exports = flatted;
