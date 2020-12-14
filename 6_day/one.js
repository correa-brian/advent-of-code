// Solution to Day 6: https://adventofcode.com/2020/day/6

const fs = require('fs');
let forms = fs.readFileSync('./forms.txt').toString().split(/\n\s{1,}/g);

let sumofAllYes = (input) => {
    let finalYesCount = 0;
    for (let i = 0; i < input.length; i++) {
        let groupAnswers = input[i].replaceAll(/\n/g,"");
        let answerMap = {};
        for (let j = 0; j < groupAnswers.length; j++) {
            if (answerMap[groupAnswers[j]]) {
                continue;
            } else {
                answerMap[aggregatedGroupAnswers[j]] = true;
            }
        }

        finalYesCount += Object.keys(answerMap).length;
    }

    return finalYesCount;
}

console.log(sumofAllYes(forms));