const fs = require("fs");
const rules = fs.readFileSync("./rules.txt").toString().split("\n");

const run = (input, bagType) => {
    let containerMap = {};
    let out = new Set();

    for (let i = 0; i < input.length; i++) {
        let current = input[i].replace(/bags?|\./gi, "").split("contain ");
        let left = current[0].trim();
        let right = current[1].split(/\.|\, /);
         
        if (right[0].trim() === "no other") {
            continue;
        } else {
            for (let j = 0; j < right.length; j++) {
                let bagDescription = right[j].trim();
                let modifiedName = bagDescription.substring(2, bagDescription.length).trim();
        
                if (containerMap[modifiedName]) {
                    containerMap[modifiedName].add(left);
                } else {
                    containerMap[modifiedName] = new Set([left]);
                }
            }
        }
    }

    function findBags(key) {
        if (containerMap[key]) {
            let res = containerMap[key];
            res.forEach(bag => out.add(bag) && findBags(bag));
        }
    }
    
    findBags(bagType);
    return out.size;
}


console.log(run(rules, "shiny gold"));