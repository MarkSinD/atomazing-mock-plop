const { execSync } = require('child_process');

// Run Plop with your configuration
execSync(`npx plop`, { stdio: 'inherit' });