import { match } from "node:assert";
import { readFile } from "node:fs/promises";
const filePath = "./input.txt";
const data = await readFile(filePath, { encoding: "utf8" });
const parsedData = data.split("");

const checkIfArrayIsAllDistinct = (arr) => {
  let checked = [];
  for (let toCheck of arr) {
    if (checked.includes(toCheck)) {
      return false;
    }
    checked.push(toCheck);
  }

  return true;
};

const findSignal = () => {
  for (let i = 0; i < parsedData.length; i++) {
    let current = parsedData[i];
    let right1 = parsedData[i + 1];
    let right2 = parsedData[i + 2];
    let right3 = parsedData[i + 3];

    if (!right1 || !right2) {
      console.log("right 1 or right 2 is falsy");
      break;
    }
    if (
      current !== right1 &&
      current !== right2 &&
      current !== right3 &&
      right1 !== right2 &&
      right1 !== right3 &&
      right2 !== right3
    ) {
      console.log("final char index is", i + 3 + 1);
      break;
    }
  }
};

const findMessage = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    // it's excluse so I won't need to add 1 to last index?
    let messageToCheck = arr.slice(i, i + 14);

    if (checkIfArrayIsAllDistinct(messageToCheck)) {
      console.log("final character index is", i + 14);
      break;
    }
  }
};
