const { of } = require('rxjs');
const { concatMap, delay } = require('rxjs/operators');

const saveToDb = (data) => of(`Saved: ${data}`).pipe(delay(1000));

of('user1', 'user2', 'user3').pipe(
    concatMap(user => saveToDb(user))
).subscribe(console.log);
// Output (sequential, with 1s delay between each):
// Saved: user1
// Saved: user2
// Saved: user3