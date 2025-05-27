const { fromEventPattern } = require('rxjs');
const { readFile } = require('fs');

// Convert Node.js style event emitter
const readFileObservable = fromEventPattern(
    handler => readFile(__filename, 'utf8', handler),
    handler => { /* cleanup logic if needed */ }
);

readFileObservable.subscribe(
    (err, data) => {
        if (err) console.error('Error:', err);
        else console.log('File content (first 50 chars):', data.substring(0, 50));
    }
);