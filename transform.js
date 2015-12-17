'use strict'
var matrix = require('./index').AL.matrix;

function transoform(obj, _filter, trans) {
    _filter = matrix(_filter, {
        deep: false
    })
    trans = matrix(trans, _filter.row, _filter._column, {
        deep: false
    })
    console.log('trans', trans.array);
    let objMat = matrix(obj, {
        deep: false
    })
    console.log('ObjMat', objMat.array);
    let filter = objMat.filterByPositionRow
    let filterMat = matrix(filter, _filter.row, _filter._column, {
        deep: false
    })
    let objFiltered = filterMat.apply(_filter)
    console.log(objFiltered._(1, 1).array);
    console.log('trans.apply(objFiltered)', trans.apply(objFiltered).array);
    let objTrans = trans.apply(objFiltered)
    var array = []
    objTrans.forEachRow(function (row) {
        var obj = {}
        row.forEach(function (item) {
            Object.assign(obj, item)
        })
        array.push(obj)
    })
    console.log('array', array);
    console.log(matrix(array).array);
    return matrix(array)
}
let filter = [
    [2, 1],
    [3, 4],
]
let obj = {
    a: 1,
    b: 'hola',
    c: [3, 2, 5],
    d: {
        key: 'value'
    }
}
var trans = function (arg) {
    console.log('arg=', arg.toObject());
    return {
        e: 3
    }
}
transoform(obj, filter, trans)
