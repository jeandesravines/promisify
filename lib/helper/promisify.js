/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

/**
 * @param {function|Object|string} data
 * @param {boolean} [prevent]
 * @return {function(...[*]): Promise}
 */
function promisify(data, prevent = false) {
	let promisified = data;

	if (typeof data === 'function') {
		promisified = (...args) => new Promise((resolve, reject) => {
			data.call(data, ...args.concat((error, ...data) => {
				error ? reject(error) : resolve.call(this, ...data);
			}));
		});

	} else if (typeof data === 'object' && false === prevent) {
		Object.keys(promisified = Object.assign({}, data)).forEach((key) => {
			if (typeof data[key] === 'function') {
				promisified[key] = promisify(data[key], true);
			}
		});

	} else if (typeof data === 'string' && false === prevent) {
		promisified = promisify(require(data));
	}

	return promisified;
}

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

module.exports = promisify;