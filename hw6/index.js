'use strict';

const taskInput = document.querySelector('.task-input');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const form = document.querySelector('.create-task-form');
const editForm = document.querySelector('.edit-task-form');
const editTaskInput = document.querySelector('.edit-task-input');
const editTaskCancelBtn = document.querySelector('.edit-task-cancel');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    closeEditForm();

    const inputValue = taskInput.value.trim();

    if (inputValue === '') {
        return;
    }

    createSingleTaskElement(inputValue);

    storeTaskInLocalStorage(inputValue);

    taskInput.value = '';
})

document.addEventListener('DOMContentLoaded', () => {
    const tasks = getStoredTasksArray();

    tasks.forEach((task) => {
        createSingleTaskElement(task);
    })
});

taskList.addEventListener('click', (event) => {
    const iconContainer = event.target;

    if (iconContainer.closest('.delete-item') !== null) {
        const currentLi = iconContainer.closest('li');

        if (confirm(`Ви дійсно хочете видалити "${currentLi.firstChild.nodeValue}"?`)) {
            const currentTaskIndex = retrieveTaskIndex(currentLi);
            const tasks = getStoredTasksArray();
            
            currentLi.remove();

            tasks.splice(currentTaskIndex, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    } else if (iconContainer.closest('.edit-item') !== null) {
        const currentLi = iconContainer.closest('li');
        
        currentLi.append(editForm);
        editForm.hidden = false;
        editTaskInput.value = currentLi.firstChild.nodeValue;
        editTaskInput.focus();
    }
})

editForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputValue = editTaskInput.value.trim();

    if (inputValue === '') {
        return;
    }

    const currentLi = editForm.parentElement;
    const currentTaskIndex = retrieveTaskIndex(currentLi);
    const tasks = getStoredTasksArray();

    currentLi.firstChild.nodeValue = inputValue;
    closeEditForm();
    
    tasks.splice(currentTaskIndex, 1, inputValue);
    localStorage.setItem('tasks', JSON.stringify(tasks));
})

editTaskCancelBtn.addEventListener('click', closeEditForm);

clearBtn.addEventListener('click', () => {
    if (confirm('Ви дійсно хочете видалити всі завдання?')) {
        localStorage.clear();
        taskList.innerHTML = '';
    }
})

function createSingleTaskElement(newTask) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(newTask));

    const editElement = document.createElement('span');
    editElement.className = 'edit-item';
    editElement.innerHTML = '<i class="fa fa-edit"></i>';
    
    const deleteElement = document.createElement('span');
    deleteElement.className = 'delete-item';
    deleteElement.innerHTML = '<i class="fa fa-remove"></i>';

    li.append(editElement, deleteElement);

    taskList.appendChild(li);
}

function storeTaskInLocalStorage(newTask) {
    const tasks = getStoredTasksArray();

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getStoredTasksArray() {
    return localStorage.getItem('tasks') !== null
        ? JSON.parse(localStorage.getItem('tasks'))
        : [];
}

function retrieveTaskIndex(li) {
    const taskListArray = Array.from(taskList.children);

    for (let i = 0; i < taskListArray.length; i++) {
        if (li === taskListArray[i]) {
            return i;
        }
    }
}

function closeEditForm() {
    taskList.after(editForm);
    editTaskInput.value = '';
    editForm.hidden = true;
}