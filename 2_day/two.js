// Solution to Day 2: https://adventofcode.com/2020/day/2
const fs = require('fs');
let file = fs.readFileSync('./password_db.txt').toString().split('\n');

/**
 * Count valid passwords according to old password policy.
 * @param {Array<String>} passwordDB 
 * @param {string} passwordPolicy 
 * @returns {Number}
 */
function countValidPasswords(passwordDB, passwordPolicy) {
    let validNumberOfPasswords = 0;

    for (let i = 0; i < passwordDB.length; i++) {
        let entry = passwordDB[i].split(' ');
        let frequencyRange = entry[0].split('-');
        let min = parseInt(frequencyRange[0]);
        let max = parseInt(frequencyRange[1]);
        let searchString = entry[1];
        let searchChar = searchString[0];
        let password = entry[2];

        if (isValidPassword(passwordPolicy, password, searchChar, min, max)) {
            validNumberOfPasswords++;
        }
    }

    console.log("Valid Number Of Passwords", validNumberOfPasswords);
    return validNumberOfPasswords;
}

/**
 * Validates password against policy passed in as an argument.
 * 
 * @param {string} passwordPolicy 
 * @param {String} password 
 * @param {String} searchChar 
 * @param {Number} firstIndex
 * @param {Number} secondIndex 
 * @returns {boolean}
 */
function isValidPassword(passwordPolicy, password, searchChar, firstIndex, secondIndex) {
    let isValidPassword = false;
    switch (passwordPolicy) {
        case 'legacyPolicy':
            let charCounter = 0;
            for (let j = 0; j < password.length; j++) {
                if (isSameCharacter(password[j], searchChar)) {
                    charCounter++;
                }
            }

            if (charCounter >= firstIndex && charCounter <= secondIndex) {
                isValidPassword = true;
            }
            break;
        case 'currentPolicy':
            // not zero-indexed
            let firstChar = password[firstIndex - 1];
            let secondChar = password[secondIndex - 1];
            if (possibleValidPassword(firstChar, searchChar)) {
                let duplicateEntry = isSameCharacter(firstChar, secondChar);
                if (duplicateEntry) {
                    break;
                }

                isValidPassword = true;
            } else if (possibleValidPassword(secondChar, searchChar)) {
                isValidPassword = true;
            }
            break;
        default:
            break;
    }

    return isValidPassword;
}

/**
 * Checks if passed character is not undefined and equal to the search char.
 * @param {string} currentChar 
 * @param {string} searchChar 
 * @returns {boolean}
 */
function possibleValidPassword(currentChar, searchChar) {
    return currentChar !== undefined && currentChar === searchChar;
}

/**
 * Equality check between two characters.
 * @param {string} charA 
 * @param {string} charB 
 */
function isSameCharacter(charA, charB) {
    return charA === charB;
}

countValidPasswords(file, 'legacyPolicy');
countValidPasswords(file, 'currentPolicy');
