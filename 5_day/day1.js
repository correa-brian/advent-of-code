// Solution to Day 5: https://adventofcode.com/2020/day/5
const fs = require('fs');
const boardingPasses = fs.readFileSync('./boardingPasses.txt').toString().split('\n');

function getHighestSeatId(input) {
  let highestSeatId = 0;
  for (let i = 0; i < input.length; i++) {
    let line = input[i];
    let rowMin = 0;
    let rowMax = 127;
    let colMin = 0;
    let colMax = 7;
    for (let j = 0; j < line.length-3; j++) {
      let char = line[j];
      if (char === "F") {
        // take lower half
        let result = Math.floor((rowMax - rowMin) /2);
        rowMax = rowMin + result;
      } else if (char === "B") {
        // take upper half
        let result = Math.floor((rowMax - rowMin) / 2);
        rowMin += result;
      }
    }

    for (let j = line.length - 3; j < line.length; j++) {
      let char = line[j];
      if (char === "L") {
        //lower half
        let result = Math.floor((colMax - colMin) /2);
        colMax = colMin + result;
      } else if (char === "R") {
        let result = Math.floor((colMax - colMin) /2);
        colMin += result;
      }
    }

    let row = Math.max(rowMin, rowMax);
    let col = Math.max(colMin, colMax);
    // calc seat id
    let seatId = row * 8 + col;
    if (seatId > highestSeatId) {
      highestSeatId = seatId;
    }
  }

  return highestSeatId;
}



console.log(getHighestSeatId(boardingPasses));
