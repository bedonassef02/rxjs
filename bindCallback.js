const { bindCallback } = require('rxjs');

// A function with standard callback (error-first not required)
function regularCallbackFunction(x, y, callback) {
    callback(x + y);
}

// Convert to observable
const boundFunction = bindCallback(regularCallbackFunction);

// Use as observable
boundFunction(3, 4)
    .subscribe(result => console.log('3 + 4 =', result));
// Output: 3 + 4 = 7