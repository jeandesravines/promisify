/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

/**
 * Promisify a function
 * @param {function|Object|string} data
 * @param {boolean} [prevent]
 * @return {function(...[*]): Promise} a function wich returns a Promise
 */
function promisify(data, prevent = false) {
	let promisified;

	if (typeof data === 'function') {
		promisified = (...args) => new Promise((resolve, reject) => {
			data.call(data, ...args.concat((error, ...args) => {
				error ? reject(error) : resolve.call(data, ...args);
			}));
		});
	} else if (typeof data === 'object' && false === prevent) {
		promisified = new Proxy({}, {
			get: (target, property) => promisify(data[property], true),
		});
	} else if (typeof data === 'string' && false === prevent) {
		promisified = promisify(require(data));
	} else {
		promisified = data;
	}

	return promisified;
}


module.exports = promisify;
