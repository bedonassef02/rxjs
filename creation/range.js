const { range } = require('rxjs');

console.log('Emitting sequence with range()');

range(5, 4).subscribe({
    next: val => console.log('Value:', val),
    complete: () => console.log('Completed emitting with range()')
});
// Output: 5,6,7,8
