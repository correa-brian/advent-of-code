// Solution to Day 4: https://adventofcode.com/2020/day/4

const fs = require('fs');
let passports = fs.readFileSync('./passports.txt').toString().split('\n');
let requiredFieldsSet = new Set(["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"]);
const eyeColorSet = new Set(["amb", "blu", "brn", "gry", "grn",  "hzl", "oth"]);

/**
 * Accepts passport data and returns a count of valid passwords.
 * @param {Array<String>} input 
 * @returns {Number}
 */
function countPasswordsWithValidKeys(input) {
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
        
        let isCidEdgeCase = doPassiveCidEval(fieldSetCopy) && allPassportFieldsEvaluated(input[i + 1]);
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
    return nextLine === undefined || nextLine.length === 0;
}

/**
 * There is a special case where a passport is valid if it hass all fields except "cid". This method checks for this edge case.
 * @param {Set<String} requiredFieldSet 
 * @returns {boolean}
 */
function doPassiveCidEval(requiredFieldSet) {
    return requiredFieldSet.size === 1 && requiredFieldSet.has("cid");
}

/**
 * Counts all passports the pass data validation.
 * @param {Array<String} input 
 * @returns {Number}
 */
function countAllValidPassports(input) {
    let validPassportCount = 0;
    let fieldSetCopy = new Set(requiredFieldsSet);
    let passportMap = {};

    for (let i = 0; i < input.length; i++) {
        // parse out the values
        let line = input[i];
        // skip new line
        if (line.length === 0) {
            // repopulate set copy
            fieldSetCopy = new Set(requiredFieldsSet);
            passportMap = {};
            continue;
        }

        let data = line.split(" ");
        for (let j = 0; j < data.length; j++) {
            let currentPair = data[j].split(':');
            let key = currentPair[0];
            let value = currentPair[1];
            passportMap[key] = value;
            fieldSetCopy.delete(key);
        }
        
        let isCidEdgeCase = doPassiveCidEval(fieldSetCopy) && allPassportFieldsEvaluated(input[i + 1]);
        if (fieldSetCopy.size === 0 || isCidEdgeCase) {
            if (validatePassportMap(passportMap)) {
                validPassportCount++;
            }   
        }
    }

    return validPassportCount;

}

/**
 * Validates all the fields in the passport map according to the airport policy.
 * @param {Map<String, Object} map 
 * @returns {boolean}
 */
function validatePassportMap(map) {
    // first check that all the years are in range
    let validBirthYear = yearIsValid(parseInt(map["byr"]), 1920, 2002);
    let validIssueYear = yearIsValid(parseInt(map["iyr"]), 2010, 2020);
    let validExpYear = yearIsValid(parseInt(map["eyr"]), 2020, 2030);

    if (!validBirthYear || !validIssueYear || !validExpYear) {
        return false;
    }

    // height validation
    let height = map['hgt'];
    let heightRegex = /^[0-9]{1,}(cm{1}|in)/gm;
    let unitCharRegex = /(cm{1}|in)/gm;
    let digitRegex = /^[0-9]{1,}/;
    let validHeightString = heightRegex.exec(height);
    if (validHeightString === null) {
        return false;
    }
    
    let chars = unitCharRegex.exec(height);
    if (chars[0] === "in") {
        let digits = digitRegex.exec(height);
        let parsedDigits = parseInt(digits[0]);
        if (parsedDigits < 59 || parsedDigits > 76) {
            return false;
        }
    } else if (chars[0] === "cm") {
        let digits = digitRegex.exec(height);
        let parsedDigits = parseInt(digits[0]);
        if (parsedDigits < 150 || parsedDigits > 193) {
            return false;
        }
    }

    // hair validation
    let hairHexRegex = /^\#[0-9a-f]{6}/gm;
    let hairHexSearch = hairHexRegex.exec(map["hcl"]);
    if (hairHexSearch === null) {
        return false;
    }

    // eye color
    if (!eyeColorSet.has(map["ecl"])) {
        return false;
    }

    let pid = map["pid"];
    if (pid.toString().length !== 9) {
        return false;
    }
    
    return true;
}

/**
 * Checks that the year passed in as a param is within bounds.
 * @param {Number} year 
 * @param {Number} min 
 * @param {Number} max 
 * @returns {boolean}
 */
function yearIsValid(year, min, max) {
    return year >= min && year <= max;
}

console.log(countPasswordsWithValidKeys(passports));
console.log(countAllValidPassports(passports));