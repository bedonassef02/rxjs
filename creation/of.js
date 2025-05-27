const { of } = require('rxjs');

console.log('Emitting values with of()');

of(10, 20, 30).subscribe({
    next: val => console.log('Value:', val),
    complete: () => console.log('Completed emitting with of()')
});
