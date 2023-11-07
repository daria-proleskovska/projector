'use strict';

/**
 * Task 1
 */

detonatorTimerInterval(3);
// 3
// 2
// 1
// BOOM!

function detonatorTimerInterval(delay) {
    let timerID = setInterval(() => {
        if (delay > 0) {
            console.log(delay);
            delay--;
        } else {
            clearInterval(timerID);
            console.log('BOOM!');
        }
    }, 1000);
}

/**
 * Task 2
 */

detonatorTimerTimeout(3);
// 3
// 2
// 1
// BOOM!

function detonatorTimerTimeout(delay) {
    setTimeout(function detonatorTimer(delay) {
        if (delay > 0) {
            console.log(delay);
            setTimeout(detonatorTimer, 1000, delay - 1);
        } else {
            console.log('BOOM!');
        }
    }, 1000, delay);
}

/**
 * Task 3
 */

const myPets = {
    cats: [
        {
            name: 'Varia',
            sex: 'female',
            fur: 'long reed-colored',
            special: 'always sleeps under the blanket'
        },
        {
            name: 'Pushinka',
            sex: 'female',
            fur: 'semi-long white',
            special: 'talks to herself at night'
        }
    ],
    countCats() {
        const number = this.cats.length;

        if (number === 0) {
            console.log(`There are no cats.`);
        } else if (number === 1) {
            console.log(`There is 1 cat.`);
        } else {
            console.log(`There are ${number} cats.`)
        }

        return this;
    },
    introduceCats() {
        for (let cat of this.cats) {
            const pronoun = cat.sex === 'male' ? 'He' : 'She';
            console.log(`${cat.name} has ${cat.fur} fur. ${pronoun} ${cat.special}.`);
        }
        
        return this;
    }
};

myPets
    .countCats()
    .introduceCats();

/**
 * Task 4
 */

let securedMyPetsCountCats = myPets.countCats.bind(myPets);
let securedMyPetsIntroduceCats = myPets.introduceCats.bind(myPets);

setTimeout(securedMyPetsCountCats, 1000);
setTimeout(securedMyPetsIntroduceCats, 2000);

/**
 * Task 5
 */

function multiply(a, b) {
    console.log(`${a} * ${b} = ${a * b}`);
}

function slower(func, seconds) {
    console.log(`Chill out, you will get your result in ${seconds} seconds`);
    return function(...args) {
        setTimeout(func, seconds * 1000, ...args);
    }
}

let slowedMultiply = slower(multiply, 5);

slowedMultiply(5, 10);

// виведе в консоль "Chill out, you will get your result in 5 seconds
//...через 5 секунд виведе результат роботи 'multiply'