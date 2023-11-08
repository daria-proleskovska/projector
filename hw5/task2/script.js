'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const mainButton = document.querySelector('.main-btn');
    const message = document.querySelector('.message');

    if (localStorage.getItem('mainButtonState') === 'on') {
        applyOnState();
    } else if (localStorage.getItem('mainButtonState') === 'off') {
        applyOffState();
    }

    mainButton.addEventListener('click', () => {
        if (localStorage.getItem('mainButtonState') === 'off') {
            localStorage.setItem('mainButtonState', 'on');
            localStorage.setItem('stateChangeDate', formatDate(new Date()));
            applyOnState();
        } else {
            localStorage.setItem('mainButtonState', 'off');
            localStorage.setItem('stateChangeDate', formatDate(new Date()));
            applyOffState();
        }
    });

    function applyOnState() {
        body.classList.remove('dark');
        mainButton.textContent = 'Turn off';
        message.innerHTML = `<p>Last turn on: ${localStorage.getItem('stateChangeDate')}</p>`;
    }

    function applyOffState() {
        body.classList.add('dark');
        mainButton.textContent = 'Turn on';
        message.innerHTML = `<p>Last turn off: ${localStorage.getItem('stateChangeDate')}</p>`;
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