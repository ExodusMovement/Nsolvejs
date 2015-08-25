'use strict';
var   growth = require('./fit/bestfit'),
      nsolve = require('./index'),
      gnuplot= require('gnuplot'),
      function_plot= require('./fit/fitFunction_to_gnuplot'),
      commander = require('commander'),
      writedata = require('./utils/writedata'),
      log10 = require('./utils/log10'),
      fileplot  = ' "./plots/plotdata.png"',
      path      = __dirname + '/plots/plot.dat',
      path_smt  = __dirname + '/plots/plot_smt.dat',
      path_ansX = __dirname + '/plots/plot_ansx.dat',
      path_ansY = __dirname + '/plots/plot_ansy.dat',
      initialpoint =  0.5 ,
      interval =  [-3,5] ,
      test_array= [[0,41],[4,60],[8,70],[18,80]],
      test_query = [] ,
      test_y     = [] ,
      array1 = [[1,   0,  0,   0,   0,   0],
                [0.8 ,0,  0.2, 0 ,  0,   0 ],
                [0 ,  0.2,0,   0.8 ,0,   0 ],
                [0   ,0,  0.2, 0 ,  0.8, 0 ],
                [0   ,0,  0,   0.8 ,0,   0.2 ],
                [0   ,0,  0,   0 ,  0,   1 ]],
              array2 = [[0.66],
              [0.34]],
     A= new nsolve.AL.matrix(array1),
     B= new nsolve.AL.matrix(array2),
     V1= new nsolve.AL.vector([1,2,3]),
     V2= new nsolve.AL.vector([0,-1,1]),
     alpha , smoothing = true, noiseeliminate = false,
     smoothingmethod  ='exponential',
      fit_methods = ['sqrt'];

     function f(x) {
       return   Math.cos(x)-x;
     }
     commander
     .option('-a, --alpha [n]', 'Value of alpha', parseFloat, 0.2)
     .parse(process.argv);
     alpha = commander.alpha || alpha ;
     if (alpha > 1) {
       alpha = alpha/ Math.pow(100,Math.floor( log10(alpha) )+1 );
     }
     var options_fit = {smoothing : smoothing, noiseeliminate : noiseeliminate,
       smoothingmethod :smoothingmethod ,alpha : alpha, fits_name: fit_methods },
     fit = growth(test_array,test_query,test_y, options_fit) ;

     writedata(path,test_array);
     writedata(path_smt,fit.fitPointsUsed);
      writedata(path_ansX,fit.ans_ofX);
      writedata(path_ansY,fit.ans_ofY);

     gnuplot()
     .set('term png')
     .set('output ' +fileplot)
     .set('title "Plotdata"')
     .set('xlabel "Time"')
      .set('grid')
     .set('ylabel "Size"')
     .set('key left Left reverse spacing 6 font ",11"')
     .set('zeroaxis')
     .set('autoscale')
     .plot(
       '"./plots/plot.dat" ps 2 pt 3 t "Data",'+'"./plots/plot_smt.dat" ps 1 pt 5 t "Data-smt",'+function_plot(fit.fitUsed,fit.fitParamsUsed)+'  t "Bestfit='+function_plot(fit.fitUsed,fit.fitParamsUsed)+'","./plots/plot_ansy.dat"  ps 2 pt 7 lc rgb "blue" t "ans-ofY",'+'"./plots/plot_ansx.dat" ps 2 pt 13 lc rgb "black" t "ans-ofX"'
     )
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

//console.log('=> pow =',nsolve.AL.matrix.pow(A,2).truncate(2).array );

//console.log('=> multiply =',nsolve.AL.matrix.multiply(A,A).array );

//console.log('=> product =', product(A,A).array );

//console.log('=> pscalar =',nsolve.AL.matrix.pscalar(3,A).array );

//console.log('=> sum =',nsolve.AL.matrix.sum(A,A).array );

//console.log('=> trans =',nsolve.AL.matrix.trans(A).array );

//console.log('=> inv =',nsolve.AL.matrix.inv(A).array );

//console.log('=> comprobacion_inv =',product(nsolve.AL.matrix.inv(A),A).array );

console.log('=> mapping =',V1.map(f));

//console.log('=> nsolveqn =', nsolve.nsolveqn(f,interval,initialpoint));


//console.log('=> findroot =', findroot(f,interval,initialpoint));
