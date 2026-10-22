#!/usr/bin/env node
'use strict';

const passgen = require('./passgen');

function parseArgs(argv) {
  const opts = { count: 1 };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '-l' || arg === '--length') opts.length = Number(argv[++i]);
    else if (arg === '-n' || arg === '--count') opts.count = Number(argv[++i]);
    else if (arg === '-w' || arg === '--words') opts.words = Number(argv[++i]);
    else if (arg === '--phrase') opts.phrase = true;
    else if (arg === '--no-symbols') opts.symbols = false;
    else if (arg === '--no-digits') opts.digits = false;
    else if (arg === '--no-upper') opts.upper = false;
    else if (arg === '--avoid-similar') opts.avoidSimilar = true;
    else if (arg === '-h' || arg === '--help') opts.help = true;
    else throw new Error(`unknown option: ${arg}`);
  }
  return opts;
}
