import { readFile } from "node:fs/promises";
const filePath = "./input.txt";
const data = await readFile(filePath, { encoding: "utf8" });
const parsedData = data.split("\n").map((line) => line.split("\r")[0]);

let table = {
  1: ["Z", "J", "N", "W", "P", "S"],
  2: ["G", "S", "T"],
  3: ["V", "Q", "R", "L", "H"],
  4: ["V", "S", "T", "D"],
  5: ["Q", "Z", "T", "D", "B", "M", "J"],
  6: ["M", "W", "T", "J", "D", "C", "Z", "L"],
  7: ["L", "P", "M", "W", "G", "T", "J"],
  8: ["N", "G", "M", "T", "B", "F", "Q", "H"],
  9: ["R", "D", "G", "C", "P", "B", "Q", "W"],
};

for (let row of parsedData) {
  let instructions = row.split(" ");

  let numOfMoves = Number(instructions[1]);
  let origin = Number(instructions[3]);
  let destination = Number(instructions[5]);

  if (!numOfMoves) {
    continue;
  }

  if (numOfMoves === 1) {
    let crate = table[origin].pop();
    // console.log("crate in num of moves 1", crate);
    if (crate) {
      table[destination].push(crate);
    }
    continue;
  }
  let crate = table[origin].reverse().splice(0, numOfMoves).reverse();
  table[origin].reverse();
  if (crate) {
    crate.forEach((el) => table[destination].push(el));
  }
}
let result = "";
for (let column in table) {
  console.log(`Column ${column}: ${table[column]}`);
}
