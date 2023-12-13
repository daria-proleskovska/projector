import {WeatherApp} from './WeatherApp.js';
import {API_KEY, form, input} from './constants.js'

(() => {
    const weatherApp = new WeatherApp(API_KEY);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        weatherApp.fetchData();

        form.reset();
        input.focus();
    })
})()
