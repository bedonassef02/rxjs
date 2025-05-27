const { interval, of } = require('rxjs');
const { concatMapTo, take, delay } = require('rxjs/operators');

const apiCall$ = of('API Response').pipe(delay(500));

interval(1000).pipe(
    take(3),
    concatMapTo(apiCall$)
).subscribe(console.log);
// Output (every 1.5s):
// API Response
// API Response
// API Response