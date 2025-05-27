const { startCLI } = require('./task.cli');

console.log('Starting Task Manager...');
startCLI().catch(err => console.error('Error:', err));