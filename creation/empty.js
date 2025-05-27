const { of, EMPTY } = require('rxjs');
const { switchMap } = require('rxjs/operators');

function getUserById(id) {
    const users = {
        1: { id: 1, name: 'Alice' },
        2: { id: 2, name: 'Bob' }
    };

    return users[id] ? of(users[id]) : EMPTY;
}

console.log('Looking up user...');

of(3) // Try changing this to 1 or 2 to get a result
    .pipe(
        switchMap(userId => getUserById(userId))
    )
    .subscribe({
        next: user => console.log('User found:', user),
        complete: () => console.log('Completed (with or without user)')
    });

// Output when ID is 3:
// Looking up user...
// Completed (with or without user)

// Output when ID is 1:
// Looking up user...
// User found: { id: 1, name: 'Alice' }
// Completed (with or without user)
