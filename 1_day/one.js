// Solution to Day 1: https://adventofcode.com/2020/day/1

const fs = require('fs');
let report = fs.readFileSync('./expense_report.txt').toString().split('\n');

/**
 * find the product of 2 entries that add up to 2020
 */
function productOf2Entries() {
    let outMap = {};
    for (let i = 0; i < report.length; i++) {
        outMap[parseInt(report[i])] = true;
    }

    for (let key in outMap) {
        if (outMap[2020-key] === true) {
            let parsedInt = key * (2020-key);
            return parsedInt;
        }
    }
}

/**
 * find product of the 3 entries that add up to 2020
 */
function productOf3Entries() {    
    let potentialAnswerMap = {};
    for (let i = 0; i < report.length; i++) {
        for (let j = 1; j < report.length-1; j++) {
            let first = parseInt(report[i]);
            let second = parseInt(report[j]);
            let sumOf2 = first + second;
            if (sumOf2 >= 2020) {
                continue;
            } else {
                potentialAnswerMap[sumOf2] = first * second;
            }
        }
    }

    for (let k = 0; k < report.length; k++) {
        for (let potentialAnswer in potentialAnswerMap) {
            let current = parseInt(report[k]);
            let sumOf3 = parseInt(potentialAnswer) + current;
            
            if (sumOf3 === 2020) {
                let product = potentialAnswerMap[potentialAnswer] * current;
                return product;
            }
        }
    }
}

productOf2Entries();
productOf3Entries();
