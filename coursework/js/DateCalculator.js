export class DateCalculator {
    #startDate;
    #endDate;
    #filterDays;
    #unit;
    
    constructor(startDate, endDate, filterDays = 'all', unit = 'days') {
        this.#startDate = startDate;
        this.#endDate = endDate;
        this.#filterDays = filterDays;
        this.#unit = unit;
    }

    resultOutput = () => {
        const result = this.calculate();
        const unitOutput = result === 1 ? this.#unit.slice(0, -1) : this.#unit;
        let filterOutput = '';

        if (this.#filterDays !== 'all') {
            filterOutput = `of ${this.#filterDays}`;
        }
        
        return `${result} ${unitOutput} ${filterOutput}`;
    }

    calculate = () => {
        let result = Date.parse(this.#endDate) - Date.parse(this.#startDate);
        if (this.#filterDays !== 'all') {
            result = this.#filter(result) * 86400000;
        }
        switch (this.#unit) {
            case 'days':
                result /= 86400000;
                break;
            case 'hours':
                result /= 3600000;
                break;
            case 'minutes':
                result /= 60000;
                break;
            case 'seconds':
                result /= 1000;
                break;
            default:
                console.log('Must be \'days\', \'hours\', \'minutes\' or \'seconds\'');
                return;
        }
        return result;
    }

    #filter = (result) => {
        const startWeekday = new Date(this.#startDate).getDay();
        const allDaysQty = result / 86400000;
        const fullWeeks = Math.floor(allDaysQty / 7);
        const addDays = allDaysQty % 7;
        let weekends = fullWeeks * 2;

        const arr = [];
        let i = 8 - addDays;
        while (i < 7) {
            arr.push(i);
            i++;
        }
        if (arr.includes(startWeekday)) {
            weekends += 2;
        } else if ([0, 7 - addDays].includes(startWeekday)) {
            weekends += 1;
        }
        
        if (this.#filterDays === 'weekends') {
            return weekends;
        }
        if (this.#filterDays === 'weekdays') {
            return allDaysQty - weekends;
        }
    }
}