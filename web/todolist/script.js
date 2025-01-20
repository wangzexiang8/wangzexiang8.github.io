let tasks = [];

function loadTasks() {
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
        tasks = [];
    }
    renderTasks();
}

function addTask() {
    const input = document.getElementById('new-task-input');
    const taskText = input.value.trim();
    if (taskText === '') {
        alert('Please enter a task.');
        input.value = '';
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    input.value = '';
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function toggleComplete(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

function clearAllTasks() {
    if (confirm('Are you sure you want to delete all tasks?')) {
        tasks = [];
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

function renderTasks() {
    const list = document.getElementById('task-list');
    list.innerHTML = '';
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${task.id})">
            <span class="${task.completed ? 'task-completed' : ''}">${task.text}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        list.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    document.getElementById('new-task-input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});