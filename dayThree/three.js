// Solution to Day 3: https://adventofcode.com/2020/day/3

const fs = require('fs');
let map = fs.readFileSync('./map.txt').toString().split('\n');

/**
 * Finds and returns the total number of trees ("#") in the map when navigating with the pass slope.
 * @param {Array<String} map 
 * @param {Number} x 
 * @param {Number} y 
 */
function findTrees(map, x, y) {
    let numTrees = 0;
    let innerIndex = 0;

    let lineLength = map[0].length;
    for (let outerIndex = 0; outerIndex < map.length; outerIndex += y) {
        let currentPosition = map[outerIndex][innerIndex];
        if (currentPosition === "#") {
            numTrees++
        }

        innerIndex += x;
        let indexOutOfBounds = innerIndex >= lineLength;
        if (indexOutOfBounds) {
            // reset the index to the beginning of the array
            let indexDiff = innerIndex - lineLength;
            innerIndex = indexDiff;
        }
    }

    return numTrees;
}

/**
 * For a hardcoded set of slope combos, this method finds the total number of trees and find the product of the sums.
 * @param {Array<String} map 
 */
function findNPossibleCombos(map) {
    let slopeCombos = [[1,1], [3,1], [5,1], [7,1], [1,2]];
    let product = 1;
    for (let i = 0; i < slopeCombos.length; i++) {
        let currentCombo = slopeCombos[i];
        let x = currentCombo[0];
        let y = currentCombo[1];
        product *= findTrees(map, x, y);
    }

    return product;
}

findTrees(map, 3, 1);
findNPossibleCombos(map);