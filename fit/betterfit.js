'use strict';
var regression = require('regression'),
    _ = require('lodash'),
    f = require('./fitFunction'),
    i, j, fit = {},
    x, array_Cloned, length,
    error = 0,
    best_fit = '',
    best_fit_error,
    length_namefit;
/** @function
 * This function calculate the best fit.
 * @param {Array} array_tofit
 * @return {Object} Best fit
 */
function better(array_tofit, fits_name) {
    fits_name = fits_name || ['linear', 'exponential', 'logarithmic', 'power', 'polynomial', 'inverse', 'sqrt'];
    length_namefit = fits_name.length;
    array_Cloned = _.clone(array_tofit, true);
    length = array_tofit.length - 1;
    best_fit = fits_name[0];
    best_fit_error = 0;
    var l, m, pivot;
    /** Calculate the regression to every method available.*/
    for (i = 0; i < length_namefit; i++) {
        if (fits_name[i] === 'inverse') {
            l = array_tofit.length;
            var array_inverse = _.clone(array_tofit, true);
            for (m = 0; m < l; m++) {
                pivot = array_inverse[m][0];
                array_inverse[m][0] = 1 / array_inverse[m][1];
                array_inverse[m][1] = pivot;
            }
            fit[fits_name[i]] = {
                regression: regression('linear', array_inverse)
            };
        } else if (fits_name[i] === 'sqrt') {
            l = array_tofit.length;
            var array_sqrt = _.clone(array_tofit, true);
            for (m = 0; m < l; m++) {
                array_sqrt[m][0] = Math.sqrt(array_sqrt[m][0]);
            }
            fit[fits_name[i]] = {
                regression: regression('linear', array_sqrt)
            };
        } else {
            fit[fits_name[i]] = {
                regression: regression(fits_name[i], array_Cloned)
            };
        }
        error = 0;
        /** Calculate the error and find the best fit minimizing  error.*/
        for (j = 0; j < length; j++) {
            x = array_tofit[j][0];
            error = error + (array_tofit[j][1] - f(fits_name[i], fit[fits_name[i]].regression.equation)(x)) * (array_tofit[j][1] - f(fits_name[i], fit[fits_name[i]].regression.equation)(x));
        }
        error = Math.sqrt(error / length);
        fit[fits_name[i]].error = error;
        if (best_fit_error === 0) {
            best_fit_error = error;
        }
        if (error < best_fit_error) {
            best_fit = fits_name[i];
            best_fit_error = error;
        }
    }
    /** Define the best fit found.*/
    fit.best = {
        name: best_fit,
        error: best_fit_error,
        f: f(best_fit, fit[best_fit].regression.equation)
    };
    return fit;
}
/**Here we wrapper the function to maje a non-blocking*/
module.exports = function (array_tofit, fits_name, cb) {
    if (cb && typeof cb === 'function') {
        return new Promise(function (full, rej) {
            try {
                full(cb(better(array_tofit, fits_name)))
            } catch (e) {
                rej(cb(e, null))
            }
        })
    } else {
        return better(array_tofit, fits_name)
    }
};
