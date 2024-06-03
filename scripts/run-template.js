#!/usr/bin/env node

const { execSync } = require('child_process');

// Push the --plopfile argument along with the path to your plopfile
process.argv.push('--plopfile', './plopfile.js'); // Adjust the path as needed

// Execute Plop with the added arguments
execSync(`npx plop ${process.argv.slice(2).join(' ')}`, { stdio: 'inherit' });