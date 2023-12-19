import {Tabs} from './Tabs.js';
import {CalendarAPI} from './CalendarAPI.js';
import {CustomDatalist} from './CustomDatalist.js';
import {TableSort} from './TableSort.js';

(async () => {
    const readyState = document.readyState;
    
    const tabsNav = document.querySelector('.tabs-nav');
    const tabsList = document.querySelector('.tabs-list');
    const tabs = new Tabs(tabsNav, tabsList, 2);
    
    const API_KEY = 'aBB0i9V7XpTbcSegagt7W6GhRytBAwCR';
    
    if (readyState === 'interactive' || readyState === "complete") {
        tabs.initTabs();
        await initHolidaysForm()
    } else {
        window.addEventListener('DOMContentLoaded', async () => {
            tabs.initTabs();
            await initHolidaysForm()
        });
    }

    async function initHolidaysForm() {
        const holidaysForm = document.querySelector('.holidays-form');
        const errorContainer = document.querySelector('.holidays-form .msg-container');
        const inputCountry = document.querySelector('#input-country');
        const inputYear = document.querySelector('#input-year');
        const currentYear = new Date().getFullYear();
        
        inputYear.value = currentYear;
        
        const calendarCountries = new CalendarAPI('/countries', API_KEY, '', errorContainer);
        const countriesJSON = await calendarCountries.getData();
        const {countries} = countriesJSON.response;
        const countriesDataMap = new Map();
        countries.forEach(country => {
            countriesDataMap.set(country.country_name, country['iso-3166']);
        });

        const inputCountryDatalist = new CustomDatalist(inputCountry, countriesDataMap, 'iso');
        inputCountryDatalist.init();

        inputCountry.addEventListener('validValue', () => inputYear.removeAttribute('disabled'));
        inputCountry.addEventListener('invalidValue', () => inputYear.setAttribute('disabled', ''));

        const tableHead = document.querySelector('.holidays-table thead');
        const tableBody = document.querySelector('.holidays-table tbody');
        const tableRows = tableBody.children;
        const tableHeaders = tableHead.getElementsByTagName('th');
        const holidaysTableSort = new TableSort('.holidays-table');

        holidaysTableSort.init();
        holidaysTableSort.contentIsLoaded = false;
        
        holidaysForm.addEventListener('submit', async event => {
            event.preventDefault();
            event.submitter.blur();

            const countryISO = inputCountryDatalist.validDatasetValue;
            const yearParam = inputYear.value;

            if (countryISO === null) {
                return;
            }

            const calendarHolidays = new CalendarAPI('/holidays', API_KEY, `&country=${countryISO}&year=${yearParam}`, errorContainer);
            const holidaysJSON = await calendarHolidays.getData();
            const {holidays} = holidaysJSON.response;
            tableBody.innerHTML = '';
            holidays.forEach(holiday => {
                let {day, month, year} = holiday.date.datetime;
                day = day < 10 ? '0' + day : day;
                month = month < 10 ? '0' + month : month;
                tableBody.innerHTML += `<tr>
                    <td data-sorting-criteria="date">${day}.${month}.${year}</td>
                    <td data-sorting-criteria="name">${holiday.name}</td>
                </tr>`;
            })

            holidaysTableSort.tableRowsSortedByDateArray = Array.from(tableRows);
            holidaysTableSort.contentIsLoaded = true;
            
            for (let i = 0; i < tableHeaders.length; i++) {
                tableHeaders[i].dataset.disabled = 'false';
                delete tableHeaders[i].dataset.direction;
            }

            holidaysForm.reset();
            inputYear.setAttribute('disabled', '');
            inputYear.value = currentYear;
            inputCountryDatalist.showAllItems();
        });
    }
})()
