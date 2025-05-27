const { generate } = require('rxjs');

// Similar to a for loop
generate(
    1,              // Initial state
    x => x <= 5,    // Condition
    x => x + 1,     // Iterate
    x => x * 2      // Result selector
).subscribe(x => console.log('Generated:', x));

// Output: 2, 4, 6, 8, 10

// Fibonacci sequence example
generate(
    { a: 1, b: 1 },  // Initial state
    ({ b }) => b <= 100,
    ({ a, b }) => ({ a: b, b: a + b }),
    ({ b }) => b
).subscribe(x => console.log('Fibonacci:', x));