const { interval } = require('rxjs');
const { take } = require('rxjs/operators');

// Emit a number every second
interval(1000)
    .pipe(take(5)) // Limit to 5 emissions
    .subscribe(x => console.log('Interval count:', x));

// Countdown timer example
interval(1000)
    .pipe(take(10))
    .subscribe(x => console.log('Time remaining:', 9 - x));