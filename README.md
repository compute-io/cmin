cmin
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the cumulative minimum of a numeric array.


## Installation

``` bash
$ npm install compute-cmin
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage


``` javascript
var cmin = require( 'compute-cmin' );
```


#### cmin( arr[, options] )

Computes the cumulative minimum of the values in the input `array`.  For numeric `arrays`,

``` javascript
var data = [ 3, 2, 4, 3 ];

cmax( data );
// returns [ 3, 2, 2, 2 ]
```


The function accepts two `options`:

*  __copy__: `boolean` indicating whether to return a new `array` containing the cumulative minima. Default: `true`.
*  __accessor__: accessor `function` for accessing numerical values in object `arrays`.

To mutate the input `array` (e.g. when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data = [  3, 2, 4, 3 ];

var values = cmin( data, 2, {
	'copy': false
});
//returns [ 3, 2, 2, 2 ]

console.log( data === values );
//returns true
```


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


__Note__: if provided an empty `array`, the function returns `null`.


## Examples

``` javascript
var cmin = require( 'compute-cmin' );

// Simulate some data...
var data = new Array( 100 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}

console.log( cmin( data ) );
// returns [...]
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

Copyright &copy; 2014-2015. The Compute.io Authors.


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
