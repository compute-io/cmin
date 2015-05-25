/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	cmin = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-cmin', function tests() {

	it( 'should export a function', function test() {
		expect( cmin ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				cmin( value );
			};
		}
	});

	it( 'should throw an error if `options` is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				cmin( [1,2,3,4,5], value );
			};
		}
	});

	it( 'should throw an error if provided an accessor which is not a function', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				cmin( [1,2,3,4,5], {'accessor': value} );
			};
		}
	});

	it( 'should throw an error if provided a copy option which is not a boolean', function test() {
		var values = [
			'5',
			5,
			function(){},
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				cmin( [1,2,3,4,5], {'copy': value} );
			};
		}
	});

	it( 'should compute the cumulative minimum', function test() {
		var data, expected, results;

		data = [ 12, 4, 5, 3, 8, 2 ];
		expected = [ 12, 4, 4, 3, 3, 2 ];

		results = cmin( data );

		assert.strictEqual( results.length, expected.length );
		assert.deepEqual( results, expected );
	});

	it( 'should compute the cumulative minimum using an accessor', function test() {
		var data, expected, actual;

		data = [
			{'x':12},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];

		actual = cmin( data, {'accessor': getValue} );
		expected = [ 12, 4, 4, 3, 3, 2 ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should compute the cumulative minimum and mutate the input array', function test() {
		var data, expected, results;

		data = [ 12, 4, 5, 3, 8, 2 ];
		expected = [ 12, 4, 4, 3, 3, 2 ];

		results = cmin( data, {'copy': false} );

		assert.strictEqual( results.length, expected.length );
		assert.deepEqual( results, expected );
		assert.ok( results === data );
	});

	it( 'should compute the cumulative minimum using an accessor and mutate the input array', function test() {
		var data, expected, actual;

		data = [
			{'x':12},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];

		actual = cmin( data, {'accessor': getValue, 'copy': false} );
		expected = [ 12, 4, 4, 3, 3, 2 ];
		assert.ok( actual === data );

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( cmin( [] ) );
	});

});
