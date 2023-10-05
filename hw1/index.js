'use strict';

/* Task 1 */

const userNames1 = ["Петрик Ольга Іванівна", "Гнатюк Петро Антонович", "Рудко Андрій Опанасович"];
let initials;

initials = userNames1.map((name) => {
    let formattedName = name
        .split(' ')
        .map((word) => word[0] + '.')
        .join('');
    return formattedName;
});
initials.sort();

console.log(initials); // [ "Г.П.А.", "П.О.І.", "Р.А.О."]

/* Task 2 */

const userNames2 = ['Петро', 'Емма', 'Юстин', 'Ілля', 'Марта', 'Яна', 'Василь', 'Антон', 'Олена'];
let filteredNames = [];

// First method
userNames2.forEach((name) => {
    switch (name[0]) {
        case 'А':
        case 'Е':
        case 'Є':
        case 'И':
        case 'І':
        case 'Ї':
        case 'О':
        case 'У':
        case 'Ю':
        case 'Я':
            filteredNames.push(name);
            break;
    }
});

console.log(filteredNames); // ['Емма', 'Юстин', 'Ілля', 'Яна', 'Антон', 'Олена']

// Second method
const vowels = ['А', 'Е', 'Є', 'И', 'І', 'Ї', 'О', 'У', 'Ю', 'Я'];
filteredNames = userNames2.filter((name) => {
    return vowels.includes(name[0]);
});

console.log(filteredNames); // ['Емма', 'Юстин', 'Ілля', 'Яна', 'Антон', 'Олена']

/* Task 3 */

const currentMaxValue = 4589;
let reverseMaxValue;

reverseMaxValue = parseInt(
    currentMaxValue
        .toString()
        .split('')
        .reverse()
        .join(''), 
    10
);

console.log(reverseMaxValue); // 9854
console.log(typeof reverseMaxValue); // 'number'

/* Task 4 */

const resultsArray = [1, 2, [3, [4]]];
let productOfArray;

const resultsFlatArray = resultsArray.flat(Infinity);
productOfArray = resultsFlatArray.reduce((accumulator, currentValue) => {
    return accumulator * currentValue;
})

console.log(productOfArray); // 24