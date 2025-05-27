const readline = require('readline');
const taskService = require('./task.service');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function displayMenu() {
    console.log('\nTask Manager');
    console.log('1. Add Task');
    console.log('2. Complete Task');
    console.log('3. Delete Task');
    console.log('4. List Tasks');
    console.log('5. Search Tasks');
    console.log('6. Exit');
}

function prompt(question) {
    return new Promise(resolve =>
        rl.question(question, answer => resolve(answer))
    );
}

async function handleAddTask() {
    const description = await prompt('Enter task description: ');
    taskService.addTask(description).subscribe({
        next: task => console.log(`Added: ${task.description}`),
        complete: () => console.log('Task added successfully')
    });
}

async function handleCompleteTask() {
    const id = await prompt('Enter task ID to complete: ');
    taskService.completeTask(Number(id)).subscribe({
        next: task => {
            if (task) console.log(`Completed: ${task.description}`);
            else console.log('Task not found');
        }
    });
}

async function handleDeleteTask() {
    const id = await prompt('Enter task ID to delete: ');
    taskService.deleteTask(Number(id)).subscribe({
        next: () => console.log(`Deleted task ${id}`)
    });
}

function handleListTasks() {
    console.log('\nCurrent Tasks:');
    taskService.getTasks().subscribe(tasks => {
        tasks.forEach(task => {
            console.log(`[${task.completed ? '✓' : ' '}] ${task.id}: ${task.description}`);
        });
    });
}

async function handleSearchTasks() {
    const term = await prompt('Enter search term: ');
    taskService.searchTasks(term).subscribe({
        next: task => console.log(`Found: ${task.description}`),
        complete: () => console.log('Search complete')
    });
}

module.exports = {
    startCLI: async function () {
        let running = true;

        while (running) {
            displayMenu();
            const choice = await prompt('Choose an option: ');

            switch (choice) {
                case '1':
                    await handleAddTask();
                    break;
                case '2':
                    await handleCompleteTask();
                    break;
                case '3':
                    await handleDeleteTask();
                    break;
                case '4':
                    handleListTasks();
                    break;
                case '5':
                    await handleSearchTasks();
                    break;
                case '6':
                    running = false;
                    break;
                default:
                    console.log('Invalid choice');
            }
        }

        rl.close();
        console.log('Goodbye!');
    }
};