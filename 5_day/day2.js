// Solution to Day 5, Part 2: https://adventofcode.com/2020/day/5
const fs = require('fs');
const boardingPasses = fs.readFileSync('./boardingPasses.txt').toString().split('\n');

// finds the missing seat Id on the flight
function getMissingSeatId(input) {
  let seatId = 0;
  let seatMap = {};

  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    // calc seat id
    let seatId = getSeatId(line);
    seatMap[seatId] = true;
  }

  for (const seat in seatMap) {
    let seatId = Number(seat);
    if (!seatMap[seatId + 1] && seatMap[seatId + 2]) {
      return seatId + 1;
    }
  }

  return seatId;
}

function getSeatId(line) {
  let rowMin = 0;
  let rowMax = 127;
  let colMin = 0;
  let colMax = 7;

  let rowColumn = getRowColumn(line, colMin, colMax, rowMin, rowMax);
  let row = rowColumn[0];
  let column = rowColumn[1];
  return row * 8 + column;
}

function getNewMax(min, max) {
  let delta = Math.floor((max - min) / 2);
  return min + delta;
}

function getNewMin(min, max) {
  return Math.floor((max - min) / 2);
}

function getRowColumn(line, colMin, colMax, rowMin, rowMax) {
  for (let i = 0; i < line.length; i++) {
    let char = line[i];
    if (char === "L") {
      colMax = getNewMax(colMin, colMax);
    } else if (char === "R") {
      let result = Math.floor((colMax - colMin) /2);
      colMin += getNewMin(colMin, colMax);
    } else if (char === "B") {
        rowMin += getNewMin(rowMin, rowMax);
    } else if (char === "F") {
      rowMax = getNewMax(rowMin, rowMax);
    }
  }
  let row = Math.max(rowMin, rowMax);
  let column = Math.max(colMin, colMax);
  return [row, column];
}

console.log(getMissingSeatId(boardingPasses));