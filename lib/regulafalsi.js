let sortInterval = require('./sortInterval'),
    testRoot = require('./testRoot'),
    _ = {};
_.clone = require('../utils/clone');

function regulafalsi(f, interval, options) {
    if (!f) {
        return;
    }
    if (typeof options === 'number') {
        options = arguments[3];
    }
    options = options || {
        presicion: 0.001,
        nstepsmax: 1000
    };
    options.presicion = options.presicion || 0.001;
    options.nstepsmax = options.nstepsmax || 1000;
    let presicion = options.presicion,
        A, B, test, x, y, Root, n = 1,
        nmax = options.nstepsmax;
    interval = _.clone(interval, true);
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
    while (!Root && n < nmax) {
        Root = testRoot(A, B, f, presicion);
        n++;
    }
    return {
        Root,
        numSteps: n,
        method: 'regulafalsi'
    };
}

module.exports = function(f, interval, options, cb) {
    if (cb && typeof cb === 'function') {
        return new Promise((full, rej) => {
            try {
                full(cb(regulafalsi(f, interval, options)));
            } catch (e) {
                rej(cb(e, null));
            }
        });
    }
    return regulafalsi(f, interval, options);
};
