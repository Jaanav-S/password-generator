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

const HELP = `usage: passgen [-l N] [-n N] [--no-symbols] [--no-digits] [--no-upper]
               [--avoid-similar] [--phrase [-w N]]`;

function main() {
  let opts;
  try {
    opts = parseArgs(process.argv.slice(2));
  } catch (err) {
    console.error(err.message);
    console.error(HELP);
    process.exit(2);
  }
  if (opts.help) {
    console.log(HELP);
    return;
  }
  for (let i = 0; i < opts.count; i++) {
    const value = opts.phrase
      ? passgen.generatePassphrase({ ...opts, capitalize: true })
      : passgen.generatePassword(opts);
    const bits = opts.phrase ? passgen.passphraseEntropy(opts) : passgen.passwordEntropy(opts);
    console.log(`${value}   (${bits} bits)`);
  }
}

main();
