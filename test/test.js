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

	it( 'should compute the cumulative minimum', function test() {
		var data, expected, results;

		data = [ 12, 4, 5, 3, 8, 2 ];
		expected = [ 12, 4, 4, 3, 3, 2 ];

		results = cmin( data );

		assert.strictEqual( results.length, expected.length );
		assert.deepEqual( results, expected );
	});

});
