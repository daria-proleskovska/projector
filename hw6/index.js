'use strict';

const taskInput = document.querySelector('.task-input');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const form = document.querySelector('.create-task-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (taskInput.value.trim() === '') {
        return;
    }

    createSingleTaskElement(taskInput.value);

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';
})

document.addEventListener('DOMContentLoaded', () => {
    const tasks = localStorage.getItem('tasks') !== null
        ? JSON.parse(localStorage.getItem('tasks'))
        : [];

    tasks.forEach((task) => {
        createSingleTaskElement(task);
    })
});

taskList.addEventListener('click', (event) => {
    const iconContainer = event.target.parentElement;

    if (iconContainer.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            iconContainer.parentElement.remove();
            const tasks = localStorage.getItem('tasks') !== null
                ? JSON.parse(localStorage.getItem('tasks'))
                : [];

            tasks.forEach((task, index) => {
                if (iconContainer.parentElement.textContent === task) {
                    tasks.splice(index, 1);
                }
            })

            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
})

clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure?')) {
        localStorage.clear();
        taskList.innerHTML = '';
    }
})

function createSingleTaskElement(newTask) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(newTask));

    const deleteElement = document.createElement('span');
    deleteElement.className = 'delete-item';
    deleteElement.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(deleteElement);

    taskList.appendChild(li);
}

function storeTaskInLocalStorage(newTask) {
    const tasks = localStorage.getItem('tasks') !== null
        ? JSON.parse(localStorage.getItem('tasks'))
        : [];

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
