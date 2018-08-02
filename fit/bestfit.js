'use strict';
let f = require('./fitFunction'),
    finv = require('./fitFunctionInv'),
    betterfit = require('./betterfit'),
    smoothingdata = require('./smoothingdata'),
    noiseeliminatedata = require('./noise_eliminator'),
    fn = require('./fitf(x)'),
    fninv = require('./fitfinv(x)');
const _ = {};
_.clone = require('../utils/clone');
let getx = require('./getx'),
    gety = require('./gety'),
    Fit = require('./Fit'),
    setparams = require('./setparams_bestfit'),
    fit = {},
    array_y = [ ],
    _fit, array_x = [ ],
    _setparams;


const bestfit = function(_arrayFit, get_y, get_x, options) {
    if (!_arrayFit) return;

    _setparams = setparams(get_y, get_x, options);
    get_x = _setparams.get_x;
    get_y = _setparams.get_y;
    options = _setparams.options;
    let fits_name = options.fits_name,
        smoothing = options.smoothing,
        alpha = options.alpha,
        smoothingmethod = options.smoothingmethod,
        noiseeliminate = options.noiseeliminate,
        arrayFit = [ ],
        a, b, using = options.using;

    if (!(_arrayFit instanceof Array)) {
        fit = _.clone(_arrayFit.fit, true);
        arrayFit = _.clone(_arrayFit.fitPointsUsed, true);
        a = arrayFit[0][0];
        b = arrayFit[arrayFit.length - 1][0];
    } else {
        let l = _arrayFit.length,
            j;
        for (j = 0; j < l; j++)
            arrayFit[j] = [ _arrayFit[j][using[0]], _arrayFit[j][using[1]] ];

        if (l === 1)
            arrayFit.unshift([ 0, 0 ]);

        a = arrayFit[0][0];
        b = arrayFit[l - 1][0];
        if (noiseeliminate)
            arrayFit = noiseeliminatedata(arrayFit);


        if (smoothing)
            arrayFit = smoothingdata(arrayFit, {
                method: smoothingmethod,
                alpha
            });


        fit = betterfit(arrayFit, fits_name);
    }

    function h(x) {
        return f(fit.best.name, fit[fit.best.name].regression.equation)(x);
    }

    array_y = gety(h, get_y);

    const hinv = function(x) {
        return finv(fit.best.name, fit[fit.best.name].regression.equation)(x);
    };

    array_x = getx(hinv, get_x);

    _fit = {
        ans_ofY: array_y,
        ans_ofX: array_x,
        fitOptions: options,
        fitUsed: fit.best.name,
        fit_f: eval(fn(fit.best.name, fit[fit.best.name].regression.equation)),
        fit_finv: eval(fninv(fit.best.name, fit[fit.best.name].regression.equation)),
        fitParamsUsed: fit[fit.best.name].regression.equation,
        fitPointsUsed: arrayFit,
        fitWithError: fit.best.error,
        fitFunction: fit.best.f,
        fit
    };

    const fit_ = new Fit(_fit);
    return fit_;
};

module.exports = bestfit;
