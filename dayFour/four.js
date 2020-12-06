// Solution to Day 4: https://adventofcode.com/2020/day/4

const fs = require('fs');
let passports = fs.readFileSync('./passports.txt').toString().split('\n');
let requiredFieldsSet = new Set(["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"]);

/**
 * Accepts passport data and returns a count of valid passwords.
 * @param {Array<String>} input 
 * @returns {Number}
 */
function countValidPasswords(input) {
    let validPassportCount = 0;
    let fieldSetCopy = new Set(requiredFieldsSet);

    for (let i = 0; i < input.length; i++) {
        // parse out the values
        let line = input[i];
        // skip new line
        if (line.length === 0) {
            // repopulate set copy
            fieldSetCopy = new Set(requiredFieldsSet);
            continue;
        }

        let data = line.split(" ");
        for (let j = 0; j < data.length; j++) {
            let currentPair = data[j].split(':');
            let key = currentPair[0];
            fieldSetCopy.delete(key);
        }
        
        let isCidEdgeCase = doPassiveCidEval(fieldSetCopy) && allPassportFieldsEvaluated(input[i + 1])
        if (fieldSetCopy.size === 0 || isCidEdgeCase) {
            validPassportCount++;
        }
    }

    return validPassportCount;
}

/**
 * Checks new line is empty or defined. This means we've evaluated all the fields available for a passport.
 * @param {Array<String>} nextLine 
 * @returns {boolean}
 */
function allPassportFieldsEvaluated(nextLine) {
    return nextLine !== undefined && nextLine.length === 0;
}

/**
 * There is a special case where a passport is valid if it hass all fields except "cid". This method checks for this edge case.
 * @param {Set<String} requiredFieldSet 
 * @returns {boolean}
 */
function doPassiveCidEval(requiredFieldSet) {
    return requiredFieldSet.size === 1 && requiredFieldSet.has("cid");
}

console.log(countValidPasswords(passports));