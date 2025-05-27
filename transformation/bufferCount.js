const { interval, take } = require('rxjs');
const { bufferCount } = require('rxjs/operators');

interval(300).pipe(
    bufferCount(3), // Buffer 3 values at a time
    take(4) // Limit to 4 emissions
).subscribe(console.log);
// Output: [0,1,2], [3,4,5], [6,7,8], [9,10,11]