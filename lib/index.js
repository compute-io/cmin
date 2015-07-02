'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like'),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ).raw,
	validate = require( './validate.js' );



// FUNCTIONS //

var cmin1 = require( './array.js' ),
	cmin2 = require( './accessor.js' ),
	cmin3 = require( './matrix.js' );

// CUMULATIVE MINIMUM //

/**
* FUNCTION: cmin( x[, options] )
*	Computes the cumulative minimum.
*
* @param {Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Object} [options] - function options
* @param {Function} [options.accessor] - accessor function for accessing array values
* @param {Boolean} [options.copy=true] - boolean indicating if the function should return a new data structure
* @param {Number} [opts.dim=2] - dimension along which to compute the cumulative minimum.
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} cumulative minima
*/

function cmin( x, options ) {

	/* jshint newcap:false */
	var opts = {},
		ctor,
		err,
		dim,
		d,
		out;

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}

	if ( isMatrixLike( x ) ) {
		dim = opts.dim;
		if ( dim === undefined ) {
			dim = 2;
		} else if ( dim > 2 ) {
			throw new RangeError( 'cmin()::invalid option. Dimension option exceeds number of matrix dimensions. Option: `' + dim + '`.' );
		}
		if ( opts.copy !== false ) {
			ctor = ctors( x.dtype );
			// Create an output matrix:
			d = new ctor( x.length );
			out = matrix( d, x.shape, x.dtype );
		} else {
			out = x;
		}
		return cmin3( out, x, dim );
	}
	if ( isTypedArrayLike( x ) ) {
		if ( opts.copy === false ) {
			out = x;
		}
		else {
			ctor = x.constructor;
			out = new ctor( x.length );
		}
		return cmin1( out, x );
	}
	if ( isArrayLike( x ) ) {
		if ( opts.copy === false ) {
			out = x;
		}
		else {
			out = new Array( x.length );
		}
		if ( opts.accessor ) {
			return cmin2( out, x, opts.accessor );
		}
		return cmin1( out, x );
	}

	throw new TypeError( 'cmin()::invalid input argument. First argument must be either an array or a matrix. Value: `' + x + '`.' );
} // end FUNCTION cmin()


// EXPORTS //

module.exports = cmin;
