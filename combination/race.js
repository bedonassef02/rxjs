const { race, timer, map } = require('rxjs');

const api1$ = timer(1000).pipe(map(() => 'API 1 response'));
const api2$ = timer(800).pipe(map(() => 'API 2 response'));
const timeout$ = timer(2000).pipe(map(() => 'Timeout'));

race(api1$, api2$, timeout$).subscribe(result => {
    console.log('Winner:', result); // Will be "API 2 response"
});