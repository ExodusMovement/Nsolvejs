const sortInterval = require('./sortInterval');
const _ = {};
_.clone = require('../utils/clone');

function bisection(f, interval, options) {
    if (!f) return;

    if (typeof options === 'number') {
        options = arguments[3];
    }
    options = options || {
        presicion: 0.001,
        nstepsmax: 100000
    };
    options.presicion = options.presicion || 0.001;
    options.nstepsmax = options.nstepsmax || 100000;
    const presicion = options.presicion;
    interval = _.clone(interval, true);
    let A, B, test, x, y;
    sortInterval(interval);
    A = {
        x: interval[0],
        y: f(interval[0])
    };
    B = {
        x: interval[1],
        y: f(interval[1])
    };
    test = A.y * B.y > 0;
    if (test) {
        x = (A.x + B.x) / 2;
        y = f(x);
        test = A.y * y > 0;
        if (!test) {
            B.x = x;
            B.y = y;
        } else {
            A.x = x;
            A.y = y;
        }
    }
    test = A.y * B.y > 0;
    if (test) {
        return;
    }
    let Root;
    let n = 1;
    const nmax = options.nstepsmax;
    while (!Root && n < nmax) {
        n++;
        x = (A.x + B.x) / 2;
        y = f(x);
        if (Math.abs(y) <= presicion) {
            Root = x;
        }
        test = A.y * y > 0;
        if (!test) {
            B.x = x;
            B.y = y;
        } else {
            A.x = x;
            A.y = y;
        }
    }
    return {
        Root,
        numSteps: n,
        method: 'bisection'
    };
}

module.exports = function(f, interval, options, cb) {
    if (cb && typeof cb === 'function') {
        return new Promise((full, rej) => {
            try {
                full(cb(bisection(f, interval, options)));
            } catch (e) {
                rej(cb(e, null));
            }
        });
    }
    return bisection(f, interval, options);
};
