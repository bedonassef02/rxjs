const { forkJoin, from } = require('rxjs');
const axios = require('axios');

// Fetch multiple API endpoints simultaneously
forkJoin({
    user: from(axios.get('https://jsonplaceholder.typicode.com/users/1')),
    posts: from(axios.get('https://jsonplaceholder.typicode.com/posts?userId=1')),
    todos: from(axios.get('https://jsonplaceholder.typicode.com/todos?userId=1'))
}).subscribe({
    next: ({ user, posts, todos }) => {
        console.log(`User: ${user.data.name}`);
        console.log(`Post count: ${posts.data.length}`);
        console.log(`Todo count: ${todos.data.length}`);
    },
    error: err => console.error('API error:', err)
});
// Output: Waits for all requests, then emits combined result