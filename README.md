# Promisify

[![Build Status](https://travis-ci.org/jeandesravines/promisify.svg)](https://travis-ci.org/jeandesravines/promisify)
[![Coverage Status](https://coveralls.io/repos/github/jeandesravines/promisify/badge.svg)](https://coveralls.io/github/jeandesravines/promisify)

Promisify Node.js's callback functions and modules


## Table of contents

* [Setup](#setup)
* [Usage](#usage)
    * [Import module](#import-module)
    * [Promisify a module by name](#promisify-a-module-by-name)
    * [Promisify a function](#promisify-a-function)
* [API](#api)
* [Example](#example)
* [Contributing](#contributing) 
* [Tests](#tests)


## Setup

This module can then be installed with npm:
```shell
$ npm install @jdes/promisify
```

## Usage

### Import module

```javascript
/**
 * @type {Function}
 */
const promisify = require('@jdes/promisify');
```

### Promisify a module by name

```javascript
/**
* @type {Object}
*/
const fs = promisify('fs');
```

### Promisify a function

```javascript
/**
 * @type {Object}
 */
const fs = require('fs');

/**
 * @type {Object}
 */
const promisify = require('@jdes/promisify');

/**
 * @type {function}
 */
const readFile = promisify(fs.readFile);
```

## API

### promisify(data: Object | string | function): function(...[*]): Promise

## Example

```javascript
// Import the modue
const promisify = require('@jdes/promisify');

// Promisify by module name
const fs = promisify('fs');

// read file
fs.readFile('/dev/null')
    .then((data) => {
    	console.log(data);
    })
    .catch((error) => {
    	console.error(error);
    });
```

## Contributing

Contributions are appreciated, both in the form of bug reports and pull requests.
All pull requests have to pass tests and have a sufficient coverage.

## Tests

You can run the tests with npm:
```shell
$ npm test
```


The tests use [Mocha](http://mochajs.org) as the test framework and [Chai](http://http://chaijs.com) as the BDD assertion framework.
The coverage is measured with [Istanbul](https://github.com/gotwarlost/istanbul).