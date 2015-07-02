/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	cmin = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array cmin', function tests() {

	it( 'should export a function', function test() {
		expect( cmin ).to.be.a( 'function' );
	});

	it( 'should compute the cumulative minimum', function test() {
		var data, actual, expected;

		data = [ 12, 4, 5, 3, 8, 2 ];
		expected = [ 12, 4, 4, 3, 3, 2 ];

		actual = new Array( data.length );
		actual = cmin( actual, data );

		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( cmin( [], [] ), [] );
	});

});
