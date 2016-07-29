/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect, should} = require('chai');
const promisify = require('../../lib/helper/promisify');
const fs = require('fs');

describe('Promisify', () => {
	const cases = {
		'string': promisify('fs').readFile,
		'object': promisify(fs).readFile,
		'reference': promisify(fs.readFile)
	};

	for (let c in cases) {
		describe('Case "' + c + '"', () => {
			it('should be a function', () => {
				expect(cases[c]).to.be.a('function');
			});

			it('should return a function which return a Promise', () => {
				expect(cases[c]('/dev/null')).to.be.a('promise');
			});

			it('should resolve the promise', () => {
				return cases[c]('/dev/null');
			});

			it('should reject the promise', () => {
				return cases[c]('./unknwon/unknown')
					.then(() => Promise.reject())
					.catch(() => Promise.resolve());
			});
		});
	}
});