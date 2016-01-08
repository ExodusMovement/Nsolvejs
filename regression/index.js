'use strict'
var regression = require( './polynomial' ),
  matrix = require( '../algebraL/Mat' ),
  log = Math.log,
  exp = Math.exp
var method = {
  power: function ( arg ) {
    let data = matrix( arg )
    let dataMapped = data.map( log )
    let dataRegression = regression( dataMapped )
    return dataRegression.map( function ( item, i ) {
      if ( i === 1 ) {
        return exp( item )
      }
      return item
    } )
  },
  linear: function ( arg ) {
    let data = matrix( arg )
    return regression( data )
  },
  exponential: function ( arg ) {
    let data = matrix( arg )
    let dataMapped = data.map( function ( item, i, j ) {
      if ( j === 1 ) {
        return item
      } else {
        return log( item )
      }
    } )
    let dataRegression = regression( dataMapped )
    return dataRegression.map( function ( item, i ) {
      if ( i === 1 ) {
        return exp( item )
      } else {
        return item
      }
    } )
  },
  logarithmic: function ( arg ) {
    let data = matrix( arg )
    let dataMapped = data.map( function ( item, i, j ) {
      if ( j === 1 ) {
        return log( item )
      } else {
        return item
      }
    } )
    let dataRegression = regression( dataMapped )
    return dataRegression
  },
  polynomial: function ( arg, degree ) {
    return regression( matrix( arg ), degree )
  }
}
module.exports = function ( name, array, degree ) {
  let fit = method[ name ]( array, degree ).trans( ).array[ 0 ]
  return {
    equation: fit,
    points: array
  }
}