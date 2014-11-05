/**
*
*	COMPUTE: cmin
*
*
*	DESCRIPTION:
*		- Computes the cumulative minimum of a numeric array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

/**
* FUNCTION: cmin( arr )
*	Computes the cumulative minimum of a numeric array.
*
* @param {Array} arr - numeric array
* @returns {Array} cumulative min
*/
function cmin( arr ) {
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'cmin()::invalid input argument. Must provide an array.' );
	}
	var len = arr.length,
		v = new Array( len ),
		min;

	min = arr[ 0 ];
	v[ 0 ] = min;
	for ( var i = 1; i < len; i++ ) {
		if ( arr[ i ] < min ) {
			min = arr[ i ];
		}
		v[ i ] = min;
	}
	return v;
} // end FUNCTION cmin()


// EXPORTS //

module.exports = cmin;
