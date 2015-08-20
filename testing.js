'use strict';
var growth = require('./fit/bestfit'),
    nsolve = require('./index'),
    gnuplot= require('gnuplot'),
    function_plot= require('./fit/fitFunction_to_gnuplot'),
    commander = require('commander'),
    writedata = require('./utils/writedata'),
    fileplot  = ' "plotdata.png"',
    path      = __dirname + '/plot.dat',
    path_smt  = __dirname + '/plot_smt.dat',
    initialpoint =  0.5 ,
    interval =  [-3,5] ,
    test_array= [[0,23],[1,45],[3,52],[4,62],[5,62],[6,76],[7,71],[8,99]],
    test_query = [3.4, 4.8, 8, 11] ,
    test_y     = [100,110,120,150] ,
    array1 = [[0.8,0.5],
              [0.2,0.5]],
    array2 = [[0.66],
              [0.34]],
     A= new nsolve.AL.matrix(array1),
     B= new nsolve.AL.matrix(array2),
     V1= new nsolve.AL.vector([1,2,3]),
     V2= new nsolve.AL.vector([0,-1,1]),
     alpha , smoothing = true, noiseeliminate = false,
     smoothingmethod  ='exponential' ;

     function f(x) {
       return   Math.cos(x)-x;
     }
     commander
      .option('-a, --alpha [n]', 'Valor de alpha', parseFloat, 0.2)
      .parse(process.argv);
     alpha = commander.alpha || alpha ;
     var options_fit = {smoothing : smoothing, noiseeliminate : noiseeliminate,smoothingmethod :smoothingmethod ,alpha : alpha },
     fit = growth(test_array,test_query,test_y, options_fit) ;

     writedata(path,test_array);
      writedata(path_smt,fit.fitPointsUsed);

        gnuplot()
        .set('term png')
        .set('output ' +fileplot)
        .set('title "Plotdata"')
        .set('xlabel "Tiempo"')
        .set('ylabel "Medicion"')
        .set('key left Left reverse spacing 6')
        .set('xrange ['+test_array[0][0]+':'+1.1*test_array[test_array.length-1][0]+'] ')
        .set('yrange ['+test_array[0][1]+':'+1.1*test_array[test_array.length-1][1]+'] ')
        .set('zeroaxis')
        .plot('"./plot.dat" u 1:2 pt 8 t "Data",'+'"./plot_smt.dat" u 1:2 pt 5 t "Data-smt",'+function_plot(fit.fitUsed,fit.fitParamsUsed)+' t "Bestfit='+function_plot(fit.fitUsed,fit.fitParamsUsed)+'"')
        .set(' output')
        .end();

//console.log(
  //'Solve the equation x⁵-16x⁴+2x³-20x²+6x-7-1.6 e^(-4x²) = 0 with initial point random selected  in an interval [-100,100] with a number maximum of steps of 1000 and 1000 partitions on the calculus of numerical derivative.'
//);
//console.log('=> regulafalsi =', nsolve.calculusN.regulafalsi(f,interval));
//console.log('=> bisection =', nsolve.bisection(f,interval));

//console.log('=> fixedpoint =', nsolve.calculusN.fixedpoint(f,initialpoint));

//console.log('=> Newton_Raphson =', nsolve.calculusN.Newton_Raphson(f,interval,9));

//console.log('=> Newton_Raphson_Higherorder =', nsolve.calculusN.Newton_Raphson_Higherorder(f,interval));
//console.log('=> fit =', fit );
//console.log('=> adj =',nsolve.AL.matrix.adj(A).array );

//console.log('=> pow =',nsolve.AL.matrix.pow(A,2).array );

//console.log('=> multiply =',nsolve.AL.matrix.multiply(A,A).array );

//console.log('=> product =', product(A,A).array );

//console.log('=> pscalar =',nsolve.AL.matrix.pscalar(3,A).array );

//console.log('=> sum =',nsolve.AL.matrix.sum(A,A).array );

//console.log('=> trans =',nsolve.AL.matrix.trans(A).array );

//console.log('=> inv =',nsolve.AL.matrix.inv(A).array );

//console.log('=> comprobacion_inv =',product(nsolve.AL.matrix.inv(A),A).array );

//console.log('=> pow =',V1.map(f));

//console.log('=> nsolveqn =', nsolve.nsolveqn(f,interval,initialpoint));


//console.log('=> findroot =', findroot(f,interval,initialpoint));
