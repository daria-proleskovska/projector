import {WeatherApp} from './weatherApp.js';
import {API_KEY, form, input} from './constants.js'

(() => {
    const readyState = document.readyState;
    
    if (readyState === 'interactive' || readyState === "complete") {
        initWeatherApp();
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            initWeatherApp();
        });
    }

    function initWeatherApp() {
        const weatherApp = new WeatherApp(API_KEY);

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            await weatherApp.fetchData();

            form.reset();
            input.focus();
        })
    }
})()
