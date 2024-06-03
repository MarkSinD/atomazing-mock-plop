const { execSync } = require('child_process');

// Load your Plop configuration
const plopfile = './plopfile.js'; // Adjust the path as needed
const args = process.argv.slice(2);

// Run Plop with your configuration
execSync(`npx plop ${args.join(' ')} --plopfile=${plopfile}`, { stdio: 'inherit' });