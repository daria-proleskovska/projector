'use strict';

/**
 * Task 1
 */

function durationBetweenDates(dateStart = '24 Feb 2022', dateEnd = Date(), dimension = 'days') {
    let timeDifference = Math.abs(Date.parse(dateStart) - Date.parse(dateEnd));
    switch (dimension) {
        case 'days':
            timeDifference /= 86400000;
            break;
        case 'hours':
            timeDifference /= 3600000;
            break;
        case 'minutes':
            timeDifference /= 60000;
            break;
        case 'seconds':
            timeDifference /= 1000;
            break;
        default:
            console.log('Pass a correct argument: \'days\', \'hours\', \'minutes\' or \'seconds\'');
            return;
    }
    console.log(`${Math.floor(timeDifference)} ${dimension}`);
};

durationBetweenDates();
durationBetweenDates('02 Aug 1985', '03 Aug 1985', 'seconds')  // поверне '86400 seconds'
durationBetweenDates('31 Jan 2022', '03 Feb 2021', 'days')  // поверне '362 days'

/**
 * Task 2
 */

const priceData = {
    Apples: '23.4',
    BANANAS: '48',
    oRAnGEs: '48.7584',
};

function optimizer(data) {
    return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key.toLowerCase(), parseFloat(value).toFixed(2)])
    );
};

let updatedPriceData = optimizer(priceData);

console.log(updatedPriceData) // {apples: '23.40', bananas: '48.00', oranges: '48.76'}

/**
 * Task 3
 */

function recursiveOddSumTo(number) {
    if (number === 1) {
        return number;
    } else if (number % 2 === 0) {
        // even number
        return recursiveOddSumTo(number - 1);
    }
    // odd number
    return number + recursiveOddSumTo(number - 2);
};

console.log(recursiveOddSumTo(1)) // 1
console.log(recursiveOddSumTo(10)) // 25

/**
 * Task 4
 */

function iterativeOddSumTo(number) {
    let accumulator = 0;
    for (let i = 1; i <= number; i++) {
        if (i % 2 !== 0) {
            accumulator += i;
        }
    }
    return accumulator;
};

console.log(iterativeOddSumTo(1)) // 1
console.log(iterativeOddSumTo(10)) // 25