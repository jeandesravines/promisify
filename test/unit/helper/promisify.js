/**
 * Copyright 2017 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const Buffer = require('buffer').Buffer;
const promisify = require('../../../lib/helper/promisify');
const fs = require('fs');

describe('Promisify', () => {
  const cases = {
    string: promisify('fs').readFile,
    object: promisify(fs).readFile,
    reference: promisify(fs.readFile),
  };

  Object.keys(cases).forEach((c) => {
    describe(`Case by "${c}"`, () => {
      it('should be a function', () => {
        expect(cases[c]).to.be.a('function');
      });

      it('should return a function which return a Promise', () => {
        expect(cases[c]('/dev/null')).to.be.a('promise');
      });

      it('should resolve the promise', () => {
        return cases[c]('/dev/null')
          .then((value) => {
            expect(value).to.be.an.instanceOf(Buffer);
          });
      });

      it('should reject the promise', () => {
        return cases[c]('./unknwon/unknown')
          .then(() => Promise.reject())
          .catch(() => Promise.resolve());
      });
    });
  });

  describe('Case other type', () => {
    it('should return an integer', () => {
      expect(promisify(3)).to.be.equal(3);
    });

    it('should return the same thing', () => {
      ['hello', 4, {}].forEach((element) => {
        expect(promisify(element, true)).to.be.eql(element);
      });
    });
  });
});
