'use strict';
let assert = require('assert'),
    JNsolve = require('../index'),
    test_array = [
        [ 0, 40 ],
        [ 1, 48 ],
        [ 3, 56 ],
        [ 4, 70 ]
    ],
    test_query = [ 3.4, 4.8, 8, 11 ],
    test_y = [ 75, 83, 99, 105 ],
    mat = [],
    fsol = 0.73,
    // Interval and initial point to use in the numerical modules.
    initialpoint = 0.2,
    interval = [ -3, 5 ];
// Defining a suite of tests
Number.prototype.truncate = function(n) {
    return Math.floor(this * Math.pow(10, n)) / Math.pow(10, n);
};

function f(x) {
    return Math.cos(x) - x;
}
mat = require('./mat_test');
describe('JNsolve Module numeric values function test.', () => {
    it(
        'Found the correct solution to cos(x)-x=0 is 0.73 using the bisection method.',
        () => {
            assert.equal(JNsolve.calculusN.bisection(f, interval).Root.truncate(
                2), fsol); // should returns true
        });
});

describe('Negative cases.', () => {
    it(
        'If interval does not contain the solution to cos(x)-x=0 is 0.73 using the bisection method return undefined.',
        () => {
            assert.equal(JNsolve.calculusN.bisection(f, [ 1, 2 ]), undefined); // should returns true
        });
});
