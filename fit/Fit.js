'use strict';
/** @constructor
 * This constructor build the fit object.
 * @param {object} _fit
 * @namespace
 * @property {array}    ans_ofX           - The answer to query of value of x.
 * @property {array}    ans_ofY           - The answer to query of value of x.
 * @property {object}   fitOptions        - The options used to make fit.
 * @property {string}   fitUsed           - The bestfit's name found.
 * @property {array}    fitParamsUsed     - The pamras used to build the fit.
 * @property {string}   fitEquationUsed   - The mathematic function used.
 * @property {array}    fitPointsUsed     - The data points used to make fit.
 * @property {number}   fitWithError      - The error found with the best fit.
 */
  module.exports  =   function (_fit){
              this.ans_ofY        = _fit.ans_ofY ;
              this.ans_ofX        = _fit.ans_ofX      ;
              this.fitOptions      = _fit.fitOptions    ;
              this.fitUsed         =  _fit.fitUsed  ;
              this.fitEquationUsed = _fit.fitEquationUsed ;
              this.fitParamsUsed   = _fit.fitParamsUsed;
              this.fitPointsUsed   = _fit.fitPointsUsed;
              this.fitWithError    = _fit.fitWithError ;
              this.fit   = _fit.fit;
            };
