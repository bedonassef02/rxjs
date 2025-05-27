const { from } = require('rxjs');

const numbers = [10, 20, 30];

from(numbers).subscribe({
    next: val => console.log('Value:', val),
    complete: () => console.log('Completed!')
});

const fetchData = () => Promise.resolve({ id: 1, name: 'Alice' });

from(fetchData()).subscribe({
    next: data => console.log('User:', data),
    complete: () => console.log('Done fetching!')
});

from('RXJS').subscribe({
    next: char => console.log('Char:', char),
    complete: () => console.log('Done!')
});

