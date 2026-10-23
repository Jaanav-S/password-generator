'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { SETS, WORDS, generatePassword, generatePassphrase, passwordEntropy } = require('./passgen');

test('default password is 16 characters', () => {
  assert.strictEqual(generatePassword().length, 16);
});

test('includes every enabled character set', () => {
  for (let i = 0; i < 50; i++) {
    const pw = generatePassword({ length: 4 });
    for (const chars of Object.values(SETS)) {
      assert.ok([...pw].some((c) => chars.includes(c)), `${pw} missing a set`);
    }
  }
});
