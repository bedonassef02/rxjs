const { from } = require('rxjs');

// From an array
from([1, 2, 3]).subscribe(x => console.log('Array item:', x));

// From a promise
const myPromise = new Promise(resolve => setTimeout(() => resolve('Promise resolved!'), 1000));
from(myPromise).subscribe(x => console.log('Promise:', x));

// From a string (iterable)
from('Hello').subscribe(x => console.log('String char:', x));

// From a Set
from(new Set([1, 2, 2, 3])).subscribe(x => console.log('Set item:', x));