const { interval, fromEvent } = require('rxjs');
const { buffer, take } = require('rxjs/operators');

// Emit numbers every 500ms
const number$ = interval(500).pipe(take(10));

// Emit every 2 seconds (the buffer notifier)
const notifier$ = interval(2000);

number$.pipe(
    buffer(notifier$)
).subscribe(bufferedNumbers => {
    console.log('Buffered numbers:', bufferedNumbers);
});
// Output: [0,1,2,3], [4,5,6,7], [8,9]