const { from } = require('rxjs');
const { filter, map, reduce } = require('rxjs/operators');

const orders = [
    { id: 1, amount: 50, status: 'delivered' },
    { id: 2, amount: 150, status: 'pending' },
    { id: 3, amount: 200, status: 'delivered' },
    { id: 4, amount: 70, status: 'delivered' },
    { id: 5, amount: 30, status: 'canceled' }
];

// Goal: Calculate the total amount of all delivered orders

from(orders).pipe(
    filter(order => order.status === 'delivered'),
    map(order => order.amount),
    reduce((total, amount) => total + amount, 0)
).subscribe({
    next: total => console.log('Total delivered amount:', total),
    complete: () => console.log('Calculation done.')
});
