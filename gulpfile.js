'use strict';

var gulp = require( 'gulp' ),
    jshint = require( 'gulp-jshint' ),
    stylish = require( 'jshint-stylish' ),
    mocha = require( 'gulp-mocha' )
    // Lint
gulp.task( 'lint', function ( ) {
    return gulp.src( [ '**/*.js', '!./node_modules/**' ] )
        .pipe( jshint( ) )
        .pipe( jshint.reporter( stylish ) );
} );
// Default
gulp.task( 'default', [ 'lint', 'test' ], function ( ) {
    gulp.watch( [ '**/*.js', '!./node_modules/**' ], [ 'test' ] );
} );
// Test
gulp.task( 'test', function ( ) {
    return gulp.src( './test/test.js', {
        read: false
    } ).pipe( mocha( {
        reporter: 'nyan'
    } ) );
} );
