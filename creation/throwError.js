const { throwError } = require('rxjs');

console.log('Starting throwError observable');

throwError(() => new Error('Oops! Something went wrong')).subscribe({
    next: val => console.log('Value:', val),
    error: err => console.error('Caught error:', err.message),
    complete: () => console.log('Completed')
});
