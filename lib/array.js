'use strict';

// CUMULATIVE MINIMUM //

/**
* FUNCTION: cmin( out, arr )
*	Computes the cumulative minimum of an array.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function cmin( v, arr ) {
	var len = arr.length,
		min,
		i;

	if ( len ) {
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
