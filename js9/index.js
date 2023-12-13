import {WeatherApp} from './WeatherApp.js';
import {API_KEY, form, input} from './constants.js'

(() => {
    const weatherApp = new WeatherApp(API_KEY);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        await weatherApp.fetchData();

        form.reset();
        input.focus();
    })
})()
