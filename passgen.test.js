'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { SETS, WORDS, generatePassword, generatePassphrase, passwordEntropy } = require('./passgen');

test('default password is 16 characters', () => {
  assert.strictEqual(generatePassword().length, 16);
});
