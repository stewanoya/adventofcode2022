import { readFile } from "node:fs/promises";

const filePath = "./day1/input.txt";

const data = await readFile(filePath, { encoding: "utf8" });

const dataToArray = (data) => {
  return data.split("\n").map((num) => Number(num.split("\r")[0]) ?? "");
};

const parsedData = dataToArray(data);

const getBiggestTotal = (data) => {
  let currTotal = 0;
  let maxTotal = 0;
  for (let num of data) {
    // if no num (num is 0), we hit a "gap"
    if (!num) {
      if (currTotal > maxTotal) {
        maxTotal = currTotal;
        currTotal = 0;
        continue;
      }
      currTotal = 0;
      continue;
    }
    currTotal += num;
  }

  return maxTotal;
};

const getTop3Totals = (data) => {
  let totals = [];
  let currTotal = 0;

  for (let num of data) {
    if (!num) {
      totals.push(currTotal);
      currTotal = 0;
      continue;
    }
    currTotal += num;
  }

  return totals.sort((a, b) => b - a).splice(0, 3);
};

let total = getBiggestTotal(parsedData);
let top3 = getTop3Totals(parsedData);

console.log(total);
console.log(top3.reduce((a, b) => a + b));
