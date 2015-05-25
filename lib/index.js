'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isFunction = require( 'validate.io-function' );

// CMIN //

/**
* FUNCTION: cmin( arr[, accessor] )
*	Computes the cumulative minimum of a numeric array.
*
* @param {Number[]|Array} arr - numeric array
* @param {Function} [accessor] - accessor function for accessing array values
* @returns {Number[]|Null} cumulative min or null 
*/
function cmin( arr, clbk ) {
	if ( !isArray( arr ) ) {
		throw new TypeError( 'cmin()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	if ( arguments.length > 1 && !isFunction( clbk ) ) {
		throw new TypeError( 'cmin()::invalid input argument. Accessor must be a function. Value: `' + clbk + '`.' );
	}

	var len = arr.length,
		v = new Array( len ),
		min,
		i,
		val;

	if ( !len ) {
		return null;
	}

	if ( clbk ) {
		min = clbk( arr[ 0 ], 0 );
		v[ 0 ] = min;
		for ( i = 1; i < len; i++ ) {
			val = clbk( arr[ i ], i );
			if ( val < min ) {
				min = val;
			}
			v[ i ] = min;
		}
	} else {
		min = arr[ 0 ];
		v[ 0 ] = min;
		for ( i = 1; i < len; i++ ) {
			if ( arr[ i ] < min ) {
				min = arr[ i ];
			}
			v[ i ] = min;
		}
	}

	return v;
} // end FUNCTION cmin()


// EXPORTS //

module.exports = cmin;
