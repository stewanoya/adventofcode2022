import { readFile } from "node:fs/promises";
const filePath = "./input.txt";
const data = await readFile(filePath, { encoding: "utf8" });
const parsedData = data.split("\n").map((line) => line.split("\r")[0]);

const getRangeString = (range) => {
  const start = range.split("-")[0];
  const end = range.split("-")[1];
  let string = "";

  for (let i = start; i <= end; i++) {
    string += i;
  }

  return string;
};

// console.log(parsedData);

const checkIfShorterArrayMatches = (longArr, shortArr) => {
  for (let num of shortArr) {
    console.log(num);
    if (!longArr.includes(num)) {
      return false;
    }
  }

  console.log(longArr);
  return true;
};

const getRangeArray = (range) => {
  const start = Number(range.split("-")[0]);
  const end = Number(range.split("-")[1]);
  let arr = [];

  for (let i = start; i <= end; i++) {
    arr.push(i);
  }

  return arr;
};

const getLongerString = (string1, string2) => {
  if (string1.length > string2.length) {
    return string1;
  }

  return string2;
};

let fullOverlaps = 0;
let noOverlaps = 0;

for (let pair of parsedData) {
  let pair1 = pair.split(",")[0];
  let pair2 = pair.split(",")[1];
  let x = Number(pair1.split("-")[0]);
  let y = Number(pair1.split("-")[1]);
  let w = Number(pair2.split("-")[0]);
  let z = Number(pair2.split("-")[1]);

  if (x <= w && x <= z && y >= w && y >= z) {
    fullOverlaps++;
    continue;
  }

  if (w <= x && w <= y && z >= x && z >= y) {
    fullOverlaps++;
    continue;
  }

  if (x < w && x < z && y < w && y < z) {
    noOverlaps++;
    continue;
  }

  if (w < x && w < y && z < x && z < y) {
    noOverlaps++;
    continue;
  }
}

console.log(fullOverlaps, "full overlaps");
console.log(parsedData.length - noOverlaps, "partial overlaps");
// console.log(parsedData.length - overlaps);
