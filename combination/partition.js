const { from, partition } = require('rxjs');

const numbers$ = from([1, 2, 3, 4, 5, 6]);
const [evens$, odds$] = partition(numbers$, n => n % 2 === 0);

evens$.subscribe(x => console.log('Even:', x));
odds$.subscribe(x => console.log('Odd:', x));
// Output:
// Even: 2
// Even: 4
// Even: 6
// Odd: 1
// Odd: 3
// Odd: 5