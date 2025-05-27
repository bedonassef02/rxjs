const { merge, fromEvent, interval } = require('rxjs');
const { map, tap } = require('rxjs/operators');
const fs = require('fs');
const http = require('http');

// 1. File system watcher
const fileWatcher$ = fromEvent(
    fs.watch(__dirname, { encoding: 'utf8' }),
    'change'
).pipe(
    map(([eventType, filename]) => `File ${eventType}: ${filename}`),
    tap(console.log)
);

// 2. HTTP server requests
const server = http.createServer();
const server$ = fromEvent(server, 'request').pipe(
    map(([req, res]) => {
        res.end('Hello from merge example!');
        return `HTTP ${req.method} ${req.url}`;
    }),
    tap(console.log)
);
server.listen(3000);

// 3. Periodic timer
const timer$ = interval(5000).pipe(
    map(count => `Timer tick #${count + 1}`),
    tap(console.log)
);

// Merge all three streams
const merged$ = merge(
    fileWatcher$,
    server$,
    timer$
);

// Subscribe to the merged stream
merged$.subscribe({
    next: event => console.log('Merged event:', event),
    error: err => console.error('Error:', err),
    complete: () => console.log('Completed') // Won't happen in this case
});

console.log('Monitoring started. Try:');
console.log('1. Modifying files in this directory');
console.log('2. Visiting http://localhost:3000');
console.log('3. Waiting for timer events');