const { fromEventPattern } = require('rxjs');

// Custom event system
function createCustomEmitter() {
    let listeners = [];

    return {
        addListener: (handler) => listeners.push(handler),
        removeListener: (handler) => {
            listeners = listeners.filter(l => l !== handler);
        },
        emit: (value) => listeners.forEach(handler => handler(value))
    };
}

const emitter = createCustomEmitter();

// Create observable from custom emitter
const custom$ = fromEventPattern(
    handler => emitter.addListener(handler),   // Add listener
    handler => emitter.removeListener(handler) // Remove listener
);

// Subscribe to the custom observable
const subscription = custom$.subscribe({
    next: val => console.log('Received:', val)
});

// Emit some events
emitter.emit('one');
emitter.emit('two');

// Stop listening after 1 second
setTimeout(() => {
    subscription.unsubscribe();
    console.log('Unsubscribed');
    emitter.emit('three'); // Will not be received
}, 1000);
