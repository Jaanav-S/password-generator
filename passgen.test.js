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

test('respects disabled sets', () => {
  const pw = generatePassword({ length: 64, symbols: false, digits: false });
  assert.match(pw, /^[a-zA-Z]+$/);
});

test('avoidSimilar removes look-alike characters', () => {
  const pw = generatePassword({ length: 200, avoidSimilar: true });
  assert.doesNotMatch(pw, /[Il1O0o]/);
});

test('rejects impossible options', () => {
  assert.throws(() => generatePassword({ length: 2 }));
  assert.throws(() => generatePassword({ lower: false, upper: false, digits: false, symbols: false }));
});
