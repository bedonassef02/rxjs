const { EMPTY } = require('rxjs'); // Prefer EMPTY constant over empty()
const { delay, startWith } = require('rxjs/operators');

console.log('Starting empty observable');

EMPTY.pipe(
    startWith('This will emit immediately'),
    delay(1000) // The complete will happen after the delay
).subscribe({
    next: val => console.log('Next:', val),
    complete: () => console.log('Completed!')
});

// Output:
// Starting empty observable
// Next: This will emit immediately
// (after 1 second) Completed!