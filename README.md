# passgen

Generate strong passwords and memorable passphrases. No dependencies,
uses Node's `crypto.randomInt` for all randomness.

## Usage

```
node cli.js                     # 16 characters, all character sets
node cli.js -l 24 --no-symbols  # 24 characters, no symbols
node cli.js --phrase -w 5       # five-word passphrase
node cli.js -n 3                # three passwords
```

Every password includes at least one character from each enabled set.

## Strength

Each result is printed with its entropy in bits. As a rule of thumb, aim
for 70+ bits for anything important.
