const fs = require('fs');
const forms = fs.readFileSync("./forms.txt").toString().split(/\n\s{1,}/g);

let sumofAllYesForSingleQuestion = (input) => {
    let finalYesCount = 0;
    for (let i = 0; i < input.length; i++) {
        let group = input[i].split("\n");
        let answerMap = {};
        
        for (let j = 0; j < group.length; j++) {
            let person = group[j];
            for (let k = 0; k < person.length; k++) {
                let individualAnswer = person[k];
                if (answerMap[individualAnswer]) {
                    answerMap[individualAnswer]++;
                } else {
                    answerMap[individualAnswer] = 1;
                }
            }
        }

        for (const [key, value] of Object.entries(answerMap)) {
            if (value === group.length) {
                finalYesCount += 1;
            } 
        }

    }

    return finalYesCount;
}

console.log(sumofAllYesForSingleQuestion(forms));