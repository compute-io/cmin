cmin
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the cumulative minimum.


## Installation

``` bash
$ npm install compute-cmin
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage


``` javascript
var cmin = require( 'compute-cmin' );
```


#### cmin( x[, options] )

Computes the cumulative minimum. `x` may be either an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var data, arr;

data = [ 3, 2, 4, 3 ];
arr = cmin( data );
// returns [ 3, 2, 2, 2 ]
```


The function accepts two `options`:

*  __copy__: `boolean` indicating whether to return a new `array` containing the cumulative minima. Default: `true`.
*  __accessor__: accessor `function` for accessing numerical values in object `arrays`.
*  __dim__: dimension along which to compute the cumulative product when provided a matrix. Default: `2` (along the columns).

For non-numeric `arrays`, provide an accessor `function` for accessing `numeric` values.

``` javascript
var arr = [
	{'x':3},
	{'x':2},
	{'x':4},
	{'x':3},
];

function getValue( d ) {
	return d.x;
}

var m = cmin( arr, {
	'accessor': getValue
});
// returns [ 3, 2, 2, 2 ]
```

__Note__: the function returns an `array` with a length equal to the original input `array`.

By default, the function computes the cumulative product for a [`matrix`](https://github.com/dstructs/matrix) along the columns (`dim=2`).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

data = new Int8Array( 9 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,3], 'int8' );
/*
	[  0  1  2  
	   3  4  5
	   6  7  8 ]
*/

out = cmin( mat );
/*
	[  0  0  0  
	   3  3  3
	   6  6  6 ]
*/
```

To compute the cumulative minimum along the rows, set the `dim` option to `1`.

``` javascript
out = cmin( mat, {
	'dim': 1
});
/*
	[  0   1   2
	   0   1   2
	   0   1   2 ]
*/
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

data = [ 3, 2, 4, 3 ];

out = cmin( data, {
	'copy': false
});
// returns [ 3, 2, 2, 2 ]

bool = ( data === out );
// returns true

data = new Int16Array( 9 );
for ( i = 0; i < 9; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,3], 'int16' );
/*
	[  0  1  2  
	   3  4  5
	   6  7  8 ]
*/

out = cmin( mat, {
	'copy': false
});
/*
	[  0  0  0  
	   3  3  3
	   6  6  6 ]
*/

bool = ( mat === out );
// returns true
```

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	cmin = require( 'compute-cmin' );

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

// Typed arrays...
data = new Int32Array( 100 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random() * 10 );
}
tmp = cmin( data );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [10,10], 'int32' );
out = cmin( mat );
console.log( 'Matrix (along columns): %s\n', out.toString() );

out = cmin( mat, {
	'dim': 1
});

// Matrices (custom output data type)...
out = cmin( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

The function returns an `array` with a length equal to the original input `array`.


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.

[npm-image]: http://img.shields.io/npm/v/compute-cmin.svg
[npm-url]: https://npmjs.org/package/compute-cmin

[travis-image]: http://img.shields.io/travis/compute-io/cmin/master.svg
[travis-url]: https://travis-ci.org/compute-io/cmin

[coveralls-image]: https://img.shields.io/coveralls/compute-io/cmin/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/cmin?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/cmin.svg
[dependencies-url]: https://david-dm.org/compute-io/cmin

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/cmin.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/cmin

[github-issues-image]: http://img.shields.io/github/issues/compute-io/cmin.svg
[github-issues-url]: https://github.com/compute-io/cmin/issues
