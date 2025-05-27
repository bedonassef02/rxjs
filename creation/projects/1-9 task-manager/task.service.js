const {BehaviorSubject, from, of} = require('rxjs');
const {map, filter, tap} = require('rxjs/operators');

class TaskService {
    constructor() {
        this.tasks = [];
        this.tasks$ = new BehaviorSubject(this.tasks);
    }

    addTask(description) {
        const newTask = {
            id: Date.now(),
            description,
            completed: false
        };
        this.tasks.push(newTask);
        this.tasks$.next(this.tasks);
        return of(newTask);
    }

    completeTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = true;
            this.tasks$.next(this.tasks);
            return of(task);
        }
        return of(null);
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.tasks$.next(this.tasks);
        return of({deleted: taskId});
    }

    getTasks() {
        return this.tasks$.asObservable();
    }

    searchTasks(term) {
        return from(this.tasks).pipe(
            filter(task => task.description.includes(term)),
            map(task => ({...task}))
        );
    }
}

module.exports = new TaskService();