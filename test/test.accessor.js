/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	cmin = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor cmin', function tests() {

	it( 'should export a function', function test() {
		expect( cmin ).to.be.a( 'function' );
	});

	it( 'should compute the cumulative minimum using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x':12},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];

		expected = [ 12, 4, 4, 3, 3, 2 ];

		actual = new Array( data.length );
		actual = cmin( actual, data, getValue );

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( cmin( [], [], getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

});
