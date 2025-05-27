const readline = require('readline');
const { fromEvent } = require('rxjs');
const { map, filter, takeUntil } = require('rxjs/operators');

// Setup readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter command> '
});

rl.prompt();

// Create observable for 'line' events
const line$ = fromEvent(rl, 'line');

// Create observable for 'close' event
const close$ = fromEvent(rl, 'close');

// Handle commands
line$.pipe(
    map(input => input.trim()),
    filter(line => line.length > 0),
    takeUntil(close$) // Stop listening when readline is closed
).subscribe({
    next: (command) => {
        console.log(`Received command: ${command}`);
        if (command.toLowerCase() === 'exit') {
            rl.close(); // Trigger close$
        } else {
            rl.prompt(); // Ask for next input
        }
    },
    complete: () => console.log('Input stream closed.')
});
