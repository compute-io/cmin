'use strict';

// CUMULATIVE MINIMUM //

/**
* FUNCTION: cmin( out, arr, clbk )
*	Computes the cumulative minimum of an array using an accessor.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function cmin( v, arr, clbk ) {
	var len = arr.length,
		i,
		val,
		min;

	if ( len ) {
		min = clbk( arr[ 0 ], 0 );
		v[ 0 ] = min;
		for ( i = 1; i < len; i++ ) {
			val = clbk( arr[ i ], i );
			if ( val < min ) {
				min = val;
			}
			v[ i ] = min;
		}
	}
	
	return v;
} // end FUNCTION cmin()


// EXPORTS //

module.exports = cmin;
