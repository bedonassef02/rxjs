const {defer, of} = require('rxjs');

let isLoggedIn = false;

// Defer decides which observable to create when subscribed
const authObservable = defer(() => {
    if (isLoggedIn) {
        return of('Access granted!');
    } else {
        return EMPTY;
    }
});

console.log('Checking access...');
setTimeout(() => {
    isLoggedIn = true; // Toggle this to false to simulate unauthenticated state
    authObservable.subscribe({
        next: val => console.log('Result:', val),
        complete: () => console.log('Auth check complete')
    });
}, 1000);