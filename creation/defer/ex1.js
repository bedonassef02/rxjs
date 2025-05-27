const {defer, of} = require('rxjs');

// Create an observable that gives current date/time only when subscribed
const timeObservable = defer(() => of(new Date()));

console.log('Current time:', new Date());

setTimeout(() => {
    timeObservable.subscribe(time => console.log('Deferred time:', time));
    // This will show the time when subscribed, not when created
}, 1000);