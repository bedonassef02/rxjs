const { interval, take } = require('rxjs');
const { bufferWhen } = require('rxjs/operators');

interval(300).pipe(
    bufferWhen(() =>
        interval(1000 + Math.random() * 2000) // Random closing interval
    ),
    take(3)
).subscribe(console.log);
// Output: [0,1,2], [3,4,5,6], [7,8,9,10,11]...