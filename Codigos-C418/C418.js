document.addEventListener ('DOMContentLoaded', loadTasks);

document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    addTask();
});

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task.text, task.completed));
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value;
    if (taskText === '') return;

    createTaskElement(taskText);
    saveTask(taskText);

    taskInput.value = '';
}

function createTaskElement(taskText, completed = false) {
    const taskList = document.getElementById('task-list');

    const li = document.createElement('li');
    li.textContent = taskText;
    if (completed) li.classList.add('completed');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', deleteTask);

    const toggleButton = document.createElement('button');
    toggleButton.textContent = completed ? 'Undo' : 'Complete';
    toggleButton.classList.add('toggle');
    toggleButton.addEventListener('click', toggleTask);

    li.appendChild(deleteButton);
    li.appendChild(toggleButton);

    taskList.appendChild(li);
}

function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(e) {
    const li = e.target.parentElement;
    const taskText = li.firstChild.textContent;

    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    li.remove();
}

function toggleTask(e) {
    const li = e.target.parentElement;
    const taskText = li.firstChild.textContent;
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
            li.classList.toggle('completed');
            e.target.textContent = task.completed ? 'Undo' : 'Complete';
        }
        return task;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
