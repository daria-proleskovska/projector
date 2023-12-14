'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const mainButton = document.querySelector('.main-btn');
    const message = document.querySelector('.message p');
    
    const initTheme = localStorage.getItem('theme');

    if (initTheme === 'light') {
        lightTheme();
    } else if (initTheme === 'dark') {
        darkTheme();
    }

    mainButton.addEventListener('click', () => {
        if (localStorage.getItem('theme') === 'dark') {
            lightTheme(true);
        } else {
            darkTheme(true);
        }
    });

    function lightTheme(changeLocalStorage = false) {
        if (changeLocalStorage) {
            localStorage.setItem('theme', 'light');
            localStorage.setItem('themeChangeDate', formatDate(new Date()));
        }
        body.classList.remove('dark');
        mainButton.textContent = 'Turn off';
        message.innerText = `Last turn on: ${localStorage.getItem('themeChangeDate')}`;
    }

    function darkTheme(changeLocalStorage = false) {
        if (changeLocalStorage) {
            localStorage.setItem('theme', 'dark');
            localStorage.setItem('themeChangeDate', formatDate(new Date()));
        }
        body.classList.add('dark');
        mainButton.textContent = 'Turn on';
        message.innerText = `Last turn off: ${localStorage.getItem('themeChangeDate')}`;
    }

    function formatDate(dateObj) {
        const date = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate();
        const month = dateObj.getMonth() < 9 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        const hours = dateObj.getHours() < 10 ? '0' + dateObj.getHours() : dateObj.getHours();
        const minutes = dateObj.getMinutes() < 10 ? '0' + dateObj.getMinutes() : dateObj.getMinutes();
        const seconds = dateObj.getSeconds() < 10 ? '0' + dateObj.getSeconds() : dateObj.getSeconds();

        return `${date}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }
});