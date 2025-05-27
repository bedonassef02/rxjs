const { EventEmitter } = require('events');
const { fromEvent } = require('rxjs');

const emitter = new EventEmitter();

// Create observable from a custom event
const event$ = fromEvent(emitter, 'data');

event$.subscribe({
    next: value => console.log('Received:', value)
});

// Emit some events
emitter.emit('data', 'first');
emitter.emit('data', 'second');
