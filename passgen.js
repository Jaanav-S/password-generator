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
