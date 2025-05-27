const { zip, from } = require('rxjs');

const age$ = from([25, 30, 35]);
const name$ = from(['Alice', 'Bob', 'Charlie']);
const country$ = from(['USA', 'UK', 'Canada']);

zip(age$, name$, country$).subscribe(
    ([age, name, country]) => {
        console.log(`${name} is ${age} from ${country}`);
    }
);
// Output:
// Alice is 25 from USA
// Bob is 30 from UK
// Charlie is 35 from Canada