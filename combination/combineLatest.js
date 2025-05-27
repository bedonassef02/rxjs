const { combineLatest, interval , map} = require('rxjs');
const { take } = require('rxjs/operators');

// Simulate temperature and humidity sensors
const temperature$ = interval(1000).pipe(
    map(() => 20 + Math.random() * 5), // 20-25°C
    take(5)
);

const humidity$ = interval(1500).pipe(
    map(() => 40 + Math.random() * 20), // 40-60%
    take(5)
);

combineLatest([temperature$, humidity$]).subscribe(
    ([temp, humidity]) => {
        console.log(`Environment: ${temp.toFixed(1)}°C, ${humidity.toFixed(1)}%`);
    }
);
// Output: Emits whenever either source emits, with latest from both