import {Tabs} from './Tabs.js';
import {DateCalculator} from './DateCalculator.js';
import {LocalStorageOperator} from './LocalStorageOperator.js';
import {CalendarAPI} from './CalendarAPI.js';
import {CustomDatalist} from './CustomDatalist.js';
import {TableSort} from './TableSort.js';

(async () => {
    const readyState = document.readyState;
    
    const tabsNav = document.querySelector('.tabs-nav');
    const tabsList = document.querySelector('.tabs-list');
    const tabs = new Tabs(tabsNav, tabsList, 1);
    
    const API_KEY = 'aBB0i9V7XpTbcSegagt7W6GhRytBAwCR';
    
    if (readyState === 'interactive' || readyState === "complete") {
        tabs.initTabs();
        initDateCalculatorForm();
        await initHolidaysForm();
    } else {
        window.addEventListener('DOMContentLoaded', async () => {
            tabs.initTabs();
            initDateCalculatorForm();
            await initHolidaysForm();
        });
    }

    /**
     * Date Calculator Form
     */

    function initDateCalculatorForm() {
        const dateCalculatorForm = document.querySelector('.date-calculator-form');
        const inputStartDate = document.querySelector('#start-date');
        const inputEndDate = document.querySelector('#end-date');
        const presetLinks = document.getElementsByClassName('preset');
        const radioFilterDays = document.getElementsByName('filter-days');
        const radioUnit = document.getElementsByName('time-unit');        
        const calculationsTable = document.querySelector('.calculations-table');
        const calculationsTableBody = document.querySelector('.calculations-table tbody');
        const infoRow = calculationsTableBody.getElementsByClassName('info');
        const recentCalculations = new LocalStorageOperator('recentCalculations', 10);
        const recentCalculationsObj = recentCalculations.getParsedData();

        if (recentCalculationsObj.length) {
            infoRow[0].remove();
        }

        recentCalculationsObj.forEach(obj => {
            const newRow = document.createElement('tr');
            newRow.innerHTML += `<td>${obj.startDate}</td><td>${obj.endDate}</td><td>${obj.result}</td>`;
            calculationsTableBody.prepend(newRow);
        });

        inputStartDate.addEventListener('input', () => {
            const startDate = inputStartDate.value;
            inputEndDate.removeAttribute('disabled');
            inputEndDate.setAttribute('min', startDate);
            if (inputEndDate.value === '') {
                inputEndDate.value = startDate;
                inputStartDate.setAttribute('max', startDate);
            }
        });

        inputStartDate.addEventListener('change', () => {
            if (inputStartDate.value.length < 10) {
                inputEndDate.setAttribute('disabled', '');
            }
        });

        inputEndDate.addEventListener('input', () => {
            inputStartDate.setAttribute('max', inputEndDate.value);
        });

        for (let i = 0; i < presetLinks.length; i++) {
            presetLinks[i].addEventListener('click', event => {
                event.preventDefault();

                if (inputEndDate.value !== '') {
                    const newDateTimeStamp = Date.parse(inputEndDate.value) + presetLinks[i].dataset.preset * 86400000;
                    const newDate = new Date();
                    newDate.setTime(newDateTimeStamp);
                    const newDateString = newDate.toISOString();
                    const newDateStringNoTime = newDateString.slice(0, newDateString.indexOf('T'));
                    inputEndDate.value = newDateStringNoTime;
                    inputStartDate.setAttribute('max', newDateStringNoTime);
                }
            })
        }
        
        dateCalculatorForm.addEventListener('submit', event => {
            event.preventDefault();
            event.submitter.blur();
            
            const startDate = inputStartDate.value;
            const endDate = inputEndDate.value;
            let filterDays;
            let unit;
            radioFilterDays.forEach(radio => radio.checked ? filterDays = radio.value : '');
            radioUnit.forEach(radio => radio.checked ? unit = radio.value : '');
            const dateCalculator = new DateCalculator(startDate, endDate, filterDays, unit);
            const result = dateCalculator.resultOutput();
            const newEntry = {
                startDate: startDate,
                endDate: endDate,
                result: result,
            }

            recentCalculations.storeData(newEntry);

            if (infoRow.length) {
                infoRow[0].remove();
            }

            const newRow = document.createElement('tr');
            newRow.innerHTML += `<td>${startDate}</td><td>${endDate}</td><td>${result}</td>`;
            calculationsTableBody.prepend(newRow);

            window.scrollBy(0, calculationsTable.getBoundingClientRect().top - 100);
            dateCalculatorForm.reset();
        });
    }

    /**
     * Holidays Calendar Form
     */

    async function initHolidaysForm() {
        const holidaysForm = document.querySelector('.holidays-form');
        const errorContainer = document.querySelector('.holidays-form .msg-container');
        const inputCountry = document.querySelector('#input-country');
        const inputYear = document.querySelector('#input-year');
        const submitBtn = document.querySelector('#holidays-form-submit');
        const loader = document.querySelector('.loader-box');
        const currentYear = new Date().getFullYear();
        
        inputYear.value = currentYear;
        
        let countries;
        if (sessionStorage.getItem('countries') !== null) {
            countries = JSON.parse(sessionStorage.getItem('countries'));
        } else {
            const calendarCountries = new CalendarAPI('/countries', API_KEY, '', errorContainer);
            const countriesJSON = await calendarCountries.getData();
            countries = countriesJSON.countries;
            sessionStorage.setItem('countries', JSON.stringify(countries));
        }
        const countriesDataMap = new Map();
        countries.forEach(country => {
            countriesDataMap.set(country.country_name, country['iso-3166']);
        });

        const inputCountryDatalist = new CustomDatalist(inputCountry, countriesDataMap, 'iso');
        inputCountryDatalist.init();

        inputCountry.addEventListener('validValue', () => {
            inputYear.removeAttribute('disabled');
            submitBtn.removeAttribute('disabled');
        });
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

            const calendarHolidays = new CalendarAPI('/holidays', API_KEY, `&country=${countryISO}&year=${yearParam}`, errorContainer, loader);
            const holidaysJSON = await calendarHolidays.getData();
            const {holidays} = holidaysJSON;
            tableBody.innerHTML = '';
            holidays.forEach(holiday => {
                let {day, month, year} = holiday.date.datetime;
                day = day < 10 ? '0' + day : day;
                month = month < 10 ? '0' + month : month;
                tableBody.innerHTML += `<tr>
                    <td data-sorting-criteria="date">${year}-${month}-${day}</td>
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
