const { interval, take } = require('rxjs');
const { bufferTime } = require('rxjs/operators');

// Collect all clicks within 2 second windows
interval(500).pipe(
    bufferTime(2000),
    take(3)
).subscribe(console.log);
// Output: [0,1,2,3], [4,5,6,7], [8,9,10,11]