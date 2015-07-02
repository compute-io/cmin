'use strict';

var matrix = require( 'dstructs-matrix' ),
	cmin = require( './../lib' );

var data,
	mat,
	out,
	tmp,
	i;

// ----
// Plain arrays...
var data = new Array( 100 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}
out = cmin( data );
console.log( 'Arrays: %s\n', out );


// ----
// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = cmin( data, {
	'accessor': getValue
});
console.log( 'Accessors: %s\n', out );

// ----
// Typed arrays...
data = new Int32Array( 100 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random() * 100 );
}
tmp = cmin( data );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}
console.log( 'Typed arrays: %s\n', out );


// ----
// Matrices...
mat = matrix( data, [10,10], 'int32' );
out = cmin( mat );
console.log( 'Matrix (along columns): %s\n', out.toString() );

out = cmin( mat, {
	'dim': 1
});
console.log( 'Matrix (along rows): %s\n', out.toString() );


// ----
// Matrices (custom output data type)...
out = cmin( mat, {
	'dtype': 'uint8'
});
console.log( 'Matrix (along columns, %s): %s\n', out.dtype, out.toString() );
