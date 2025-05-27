const { interval, timer, take } = require('rxjs');
const { bufferToggle } = require('rxjs/operators');

// Source observable
const source$ = interval(300).pipe(take(20));

// Open buffer every 2 seconds for 1 second
source$.pipe(
    bufferToggle(
        interval(2000), // Opening notifier
        () => timer(1000) // Closing notifier
    )
).subscribe(console.log);
// Output: [6,7,8], [13,14,15]...