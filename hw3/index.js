'use strict'

/**
 * Task 1
 */

console.log(addThemAll(2,4)); // 6
console.log(addThemAll(1,2,3,4)); // 10
console.log(addThemAll(5,5,10)); // 20

function addThemAll(...args) {
    let sum = 0;
    for (let arg of args) {
        sum += arg;
    }
    return sum;
};

console.log('---------------------');

/**
 * Task 2
 */

console.log(multiply(5)(5))		// 25
console.log(multiply(2)(-2))	// -4
console.log(multiply(4)(3))		// 12

function multiply(a) {
	return function(b) {
        return a*b;
    };
};

console.log('---------------------');

/**
 * Task 3
 */

const movies = [
	{
		movieName: 'The Thing',
		releaseYear: 1982,
		directedBy: 'Carpenter',
		runningTimeInMinutes: 109,
	},
	{
		movieName: 'Aliens',
		releaseYear: 1986,
		directedBy: 'Cameron',
		runningTimeInMinutes: 137,
	},
	{
		movieName: 'Men in Black',
		releaseYear: 1997,
		directedBy: 'Sonnenfeld',
		runningTimeInMinutes: 98,
	},
	{
		movieName: 'Predator',
		releaseYear: 1987,
		directedBy: 'McTiernan',
		runningTimeInMinutes: 107,
	},
	{
		movieName: undefined,
		releaseYear: '1987',
		directedBy: '',
		runningTimeInMinutes: 20,
	},
];

console.log('releaseYear (ascending):', movies.sort(byProperty('releaseYear', '>'))); 
// виведе масив фільмів посортованих по року випуску, від старішого до новішого
console.log('runningTimeInMinutes (descending):', movies.sort(byProperty('runningTimeInMinutes', '<'))); 
// виведе масив фільмів посортованих по їх тривалості, від найдовшого до найкоротшого
console.log('movieName (ascending):', movies.sort(byProperty('movieName', '>'))); 
// виведе масив фільмів посортованих по назві, в алфавітному порядку

function byProperty(property, direction) {
    return function(a, b) {
        if (typeof a[property] === 'number' && typeof b[property] === 'number') {
            if (direction === '<') {
                return b[property] - a[property];
            }
            return a[property] - b[property];
        } else {
            if (direction === '<') {
                return String(b[property]).localeCompare(String(a[property]));
            }
            return String(a[property]).localeCompare(String(b[property]));
        }
    }
};

console.log('---------------------');

/**
 * Task 4
 */

const userNames = ['Петро', 'Емма', 'Петро', 'Емма', 'Марта', 'Яна', 'Василь', 'Антон', 'Олена', 'Емма'];

function filterUnique(array) {
    const arraySet = new Set();
    for (let elem of array) {
        arraySet.add(elem);
    }
    return Array.from(arraySet);
}

console.log(filterUnique(userNames)); // ['Петро', 'Емма', 'Марта', 'Яна', 'Василь', 'Антон', 'Олена'];