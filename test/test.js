'use strict';
var assert = require('assert'),
  JNsolve = require('../index'),
  test_array = [
    [0, 40],
    [1, 48],
    [3, 56],
    [4, 70]
  ],
  test_query = [3.4, 4.8, 8, 11],
  test_y = [75, 83, 99, 105],
  mat = [],
  fsol = 0.73,
  // Interval and initial point to use in the numerical modules.
  initialpoint = 0.2,
  interval = [-3, 5];
// Defining a suite of tests
var fitted = JNsolve.fit.best(test_array, test_query, test_y, {
  smoothing: false,
  noiseeliminate: false
});
Number.prototype.truncate = function(n) {
  return Math.floor(this * Math.pow(10, n)) / Math.pow(10, n);
};

function f(x) {
  return Math.cos(x) - x;
}
mat = require('./mat_test');
describe('JNsolve Module numeric values function test.', function() {
  it('JNsolve should be a object', function() {
    assert.equal(typeof JNsolve, 'function'); // should returns true
  });
  it(
    'Found the correct solution to cos(x)-x=0 is 0.73 using the regulafalsi method.',
    function() {
      assert.equal(JNsolve.calculusN.regulafalsi(f, interval).Root.truncate(
        2), fsol); // should returns true
    });
  it(
    'Found the correct solution to cos(x)-x=0 is 0.73 using the fixedpoint method.',
    function() {
      assert.equal(JNsolve.calculusN.fixedpoint(f, initialpoint).Root.truncate(
        2), fsol); // should returns true
    });
  it(
    'Found the correct solution to cos(x)-x=0 is 0.73 using the bisection method.',
    function() {
      assert.equal(JNsolve.calculusN.bisection(f, interval).Root.truncate(
        2), fsol); // should returns true
    });
  it(
    'Found the correct solution to cos(x)-x=0 is 0.73  using the Newton_Raphson method.',
    function() {
      assert.equal(JNsolve.calculusN.Newton_Raphson(f, interval,
        initialpoint).Root.truncate(2), fsol); // should returns true
    });
  it(
    'Found the correct solution to cos(x)-x=0 is 0.73 using the Newton_Raphson-Higher Order method.',
    function() {
      assert.equal(JNsolve.calculusN.Newton_Raphson_Higherorder(f,
        interval, initialpoint).Root.truncate(2), fsol); // should returns true
    });
  it(
    'Found the correct solution to cos(x)-x=0 is 0.73  using the findroot module.',
    function() {
      assert.equal(JNsolve.calculusN.findroot(f, interval, initialpoint)
        .Root.truncate(2), fsol); // should returns true
    });
  it('The method using the findroot module is Newton_Raphson_Higherorder.',
    function() {
      assert.equal(JNsolve.calculusN.findroot(f, interval, initialpoint)
        .method, 'Newton_Raphson_Higherorder'); // should returns true
    });
  it('The best fit should be the exponential.', function() {
    assert.equal(fitted.fit.best.name, 'exponential'); // should returns true
  });
  it('The best fit error should be.', function() {
    assert.equal(fitted.fit.best.error.truncate(2), 2.39); // should returns true
  });
  it('The best fit should define the function fitted', function() {
    assert.equal(typeof fitted.fit.best.f, 'function'); // should returns true
  });
  it('The ans_ofX should be a array.', function() {
    assert.equal(Array.isArray(fitted.ans_ofX), true); // should returns true
  });
  it('The first result of ans_ofX should be 4.81 .', function() {
    assert.equal(fitted.ans_ofX[0][0].truncate(2), 4.77); // should returns true
  });
  it('The ans_ofY should be a array.', function() {
    assert.equal(Array.isArray(fitted.ans_ofY), true); // should returns true
  });
  it('The first result of ans_ofY should be 62.59 .', function() {
    assert.equal(fitted.ans_ofY[0][1].truncate(2), 62.81); // should returns true
  });
  it('The best fit used should be the exponential', function() {
    assert.equal(fitted.fitUsed, 'exponential'); // should returns true
  });
  it('The bestfit object define a function of the fit.', function() {
    assert.equal(typeof fitted.fit.best.f, 'function'); // should returns true
  });
});

describe('derivative numeric.', function() {
  it('JNsolve.D should be a object', function() {
    assert.equal(typeof JNsolve.calculusN.D, 'object'); // should returns true
  });
  it('JNsolve.D.Nof() should build a object', function() {
    assert.equal(typeof new JNsolve.calculusN.D.Nof(f, 100, [0, 19]),
      'object'); // should returns true
  });
  it('JNsolve.D.Nof().f_x should be a Function', function() {
    assert.equal(typeof(new JNsolve.calculusN.D.Nof(f, 100, [0, 19])
      .f_x), 'function'); // should returns true
  });
  it('JNsolve.D.Nof().f_x should be a Function', function() {
    assert.equal(typeof new JNsolve.calculusN.D.Nof(f, 100, [0, 19])
      .f_x, 'function'); // should returns true
  });
  it('JNsolve.D.deltax method return a object', function() {
    assert.equal(typeof JNsolve.calculusN.D.deltax(100, [0, 123]),
      'object'); // should returns true
  });
  it(
    'JNsolve.D.deltax return aobject with property x_n_array like a Array',
    function() {
      assert.equal(Array.isArray(JNsolve.calculusN.D.deltax(100, [0,
        123
      ]).x_n_array), true); // should returns true
    });
  it(
    'JNsolve.D.derivativenumeric return a object with property dfdx_array like a Array',
    function() {
      assert.equal(Array.isArray(JNsolve.calculusN.D.derivativenumeric(
        f, 100, [0, 123]).dfdx_array), true); // should returns true
    });
  it('JNsolve.D.linearinterapolation is a constructor', function() {
    assert.equal(typeof JNsolve.calculusN.D.linearinterapolation,
      'function'); // should returns true
  });
  it(
    'JNsolve.D.linearinterapolation is a constructor that define the function_interpolated',
    function() {
      assert.equal(typeof new JNsolve.calculusN.D.linearinterapolation(
        [3,
          2
        ], [6, 8], [2, 9]).function_interpolated, 'function'); // should returns true
    });
  it(
    'JNsolve.D.linearinterapolation is a constructor that define the function_interpolated',
    function() {
      assert.equal(typeof new JNsolve.calculusN.D.linearinterapolation(
        [3,
          2
        ], [6, 8], [2, 9]).function_interpolated, 'function'); // should returns true
    });
});
describe('Negative cases.', function() {
  it(
    'If interval does not contain the solution to cos(x)-x=0 is 0.73 using the regulafalsi method return nothing.',
    function() {
      assert.equal(JNsolve.calculusN.regulafalsi(f, [2, 3]),
        undefined); // should returns true
    });
  it(
    'If root of function given is complex or does not exist, return undefined.',
    function() {
      assert.equal(JNsolve.calculusN.fixedpoint(function(x) {
        return x * x + 2 * x + 4;
      }, 8).Root, undefined); // should returns true
    });
  it(
    'If interval does not contain the solution to cos(x)-x=0 is 0.73 using the bisection method return undefined.',
    function() {
      assert.equal(JNsolve.calculusN.bisection(f, [1, 2]), undefined); // should returns true
    });
  it(
    'If the initial point is  far away interval that contain the solution to cos(x)-x=0 is 0.73  using the Newton_Raphson method do not converge.',
    function() {
      assert.equal(JNsolve.calculusN.Newton_Raphson(f, [-3, 1], 7).Root,
        undefined); // should returns true
    });
  it(
    'If interval does not contain the solution to cos(x)-x=0 is 0.73 using the Newton_Raphson-Higher Order method the solution is not found.',
    function() {
      assert.equal(JNsolve.calculusN.Newton_Raphson_Higherorder(f, [3,
        10
      ], initialpoint).Root, undefined); // should returns true
    });
  it('If function to solve is not given, do nothing.', function() {
    assert.equal(JNsolve.calculusN.findroot(undefined, interval,
      initialpoint), undefined); // should returns true
  });
});
