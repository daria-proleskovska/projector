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
        return dateObj.toLocaleString(undefined, {day: '2-digit'})
            + '-' + dateObj.toLocaleString(undefined, {month: '2-digit'})
            + '-' + dateObj.toLocaleString(undefined, {year: 'numeric'})
            + ' ' + dateObj.toLocaleString(undefined, {
                hourCycle: 'h23',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
    }
});