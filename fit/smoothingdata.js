const log10 = require('../utils/log10');

module.exports = function(arraytosmoothing, options) {
    options = options || {
        method: 'exponential',
        alpha: 0.8
    };
    options.method = options.method || 'exponential';
    options.alpha = options.alpha || 0.8;
    let _array = arraytosmoothing,
        arraysmoothed = [],
        method = options.method;
    if (method !== 'exponential') return arraysmoothed;
    let i, t, x_t, s_t_1, s_t,
        alpha = options.alpha,
        beta = 1 - alpha,
        length = _array.length;
    if (alpha > 1)
        alpha = Math.pow(10, Math.floor(log10(alpha) + 1));

    arraysmoothed[0] = [ _array[0][0], _array[0][1] ];
    s_t_1 = _array[0][1];
    for (i = 1; i < length; i++) {
        t = _array[i][0];
        x_t = _array[i][1];
        s_t = alpha * x_t + beta * s_t_1;
        arraysmoothed[i] = [ t, s_t ];
        s_t_1 = s_t;
    }

    return arraysmoothed;
};
