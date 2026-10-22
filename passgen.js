'use strict';

const { randomInt } = require('node:crypto');

const SETS = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digits: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.?/',
};

const SIMILAR = /[Il1O0o]/g;

const WORDS = [
  'apple', 'river', 'stone', 'cloud', 'tiger', 'maple', 'ocean', 'piano',
  'rocket', 'garden', 'silver', 'forest', 'candle', 'planet', 'violet', 'harbor',
  'falcon', 'meadow', 'copper', 'lantern', 'summit', 'thunder', 'velvet', 'orbit',
  'pepper', 'glacier', 'canyon', 'marble', 'saddle', 'willow', 'ember', 'quartz',
];

function pick(chars) {
  return chars[randomInt(chars.length)];
}

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function buildPool(options) {
  const sets = Object.keys(SETS)
    .filter((name) => options[name] !== false)
    .map((name) => (options.avoidSimilar ? SETS[name].replace(SIMILAR, '') : SETS[name]));
  if (sets.length === 0) {
    throw new Error('at least one character set must be enabled');
  }
  return sets;
}

function generatePassword(options = {}) {
  const length = options.length ?? 16;
  const sets = buildPool(options);
  if (length < sets.length) {
    throw new Error(`length must be at least ${sets.length}`);
  }
  const pool = sets.join('');
  // One guaranteed character per set, the rest from the full pool.
  const chars = sets.map(pick);
  while (chars.length < length) {
    chars.push(pick(pool));
  }
  return shuffle(chars).join('');
}

function generatePassphrase(options = {}) {
  const count = options.words ?? 4;
  const separator = options.separator ?? '-';
  const words = Array.from({ length: count }, () => pick(WORDS));
  if (options.capitalize) {
    return words.map((w) => w[0].toUpperCase() + w.slice(1)).join(separator);
  }
  return words.join(separator);
}

function entropyBits(poolSize, length) {
  return Math.round(length * Math.log2(poolSize) * 10) / 10;
}

function passwordEntropy(options = {}) {
  const pool = buildPool(options).join('');
  return entropyBits(pool.length, options.length ?? 16);
}

function passphraseEntropy(options = {}) {
  return entropyBits(WORDS.length, options.words ?? 4);
}
