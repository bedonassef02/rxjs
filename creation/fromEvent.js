const { fromEvent } = require('rxjs');
const EventEmitter = require('events');

// Create an event emitter
const emitter = new EventEmitter();

// Create observable from event
fromEvent(emitter, 'data')
    .subscribe(data => console.log('Event data:', data));

// Emit events
setInterval(() => {
    emitter.emit('data', { value: Math.random() });
}, 1000);

// After 3 seconds: emitter.removeAllListeners() to clean up