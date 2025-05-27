const { interval } = require('rxjs');

const source$ = interval(1000); // emits 0,1,2,... every 1000ms (1 second)

const subscription = source$.subscribe({
    next: val => console.log('Tick:', val),
    error: err => console.error(err),
    complete: () => console.log('Completed')
});

// To stop after 5 ticks:
setTimeout(() => {
    subscription.unsubscribe();
    console.log('Stopped interval');
}, 5500);
