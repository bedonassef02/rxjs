const {bindNodeCallback} = require('rxjs');
const fs = require('fs');

// Convert fs.readFile to observable
const readFileObservable = bindNodeCallback(fs.readFile);

// Use the observable version
readFileObservable('package.json', 'utf8')
    .subscribe({
        next: content => console.log('File content:', content.slice(0, 50) + '...'),
        error: err => console.error('Error reading file:', err)
    });