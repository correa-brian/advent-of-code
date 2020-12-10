// Solution to Day 5, Part 2: https://adventofcode.com/2020/day/5
const fs = require('fs');
const boardingPasses = fs.readFileSync('./boardingPasses.txt').toString().split('\n');

// finds the missing seat Id on the flight
function getMissingSeatId(input) {
  let seatId = 0;
  let seatMap = {};

  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    let rowMin = 0;
    let rowMax = 127;
    let colMin = 0;
    let colMax = 7;

    let row = getRow(line, rowMin, rowMax);
    let col = getColumn(line, colMin, colMax);
    // calc seat id
    let seatId = row * 8 + col;
    seatMap[seatId] = true;
  }

  for (const seat in seatMap) {
    let seatId = Number(seat);
    if (!seatMap[seatId + 1] && seatMap[seatId + 2]) {
      return seatId + 1
    }
  }

  return seatId;
}

function getNewMax(min, max) {
  let delta = Math.floor((max - min) / 2);
  return min + delta;
}

function getNewMin(min, max) {
  return Math.floor((max - min) / 2);
}

function getColumn(line, min, max) {
  for (let j = line.length - 3; j < line.length; j++) {
    let char = line[j];
    if (char === "L") {
      max = getNewMax(min, max);
    } else if (char === "R") {
      let result = Math.floor((max - min) /2);
      min += getNewMin(min, max);
    }
  }

  return Math.max(min, max);
}

function getRow(line, min, max) {
  for (let j = 0; j < line.length-3; j++) {
    let char = line[j];
    if (char === "F") {
      max = getNewMax(min, max);
    } else if (char === "B") {
      min += getNewMin(min, max);
    }
  }

  return Math.max(min, max);
}

console.log(getMissingSeatId(boardingPasses));