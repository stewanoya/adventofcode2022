import { readFile } from "node:fs/promises";
import { nextTick } from "node:process";
const filePath = "./input.txt";
const data = await readFile(filePath, { encoding: "utf8" });
const parsedData = data.split("\n").map((line) => line.split("\r")[0]);

const isTreeVisibleVertical = (tree, xIndex, yIndex) => {
  let firstPass = null;
  let secondPass = null;
  let downScore = 0;
  let upScore = 0;
  // first pass going up
  for (let i = yIndex; i < parsedData.length; i++) {
    if (i === yIndex) {
      continue;
    }
    if (Number(parsedData[i][xIndex]) >= Number(tree)) {
      firstPass = false;
      upScore++;
      break;
    }
    // check if number other than itself is bigger or equal
    upScore++;
  }
  if (firstPass === null) {
    firstPass = true;
  }
  // second pass coming back
  for (let i = yIndex - 1; i >= 0; i--) {
    // console.log("counting back i vert", i);
    if (i === yIndex) {
      continue;
    }

    if (Number(parsedData[i][xIndex]) >= Number(tree)) {
      secondPass = false;
      downScore++;
      break;
    }
    downScore++;
  }
  // console.log(`${tree} passed vertical -- at position [${xIndex}][${yIndex}]`);
  if (secondPass === null) {
    secondPass = true;
  }
  // console.log(
  //   `VERTICAL --- tree ${tree} at position [${xIndex}][${yIndex}], RESULT = ${upScore} - ${downScore}`
  // );
  return { upScore, downScore };
};

const isTreeVisibleHorizontal = (tree, xIndex, yIndex) => {
  let firstPass = null;
  let secondPass = null;
  let upScore = 0;
  let downScore = 0;

  for (let i = xIndex; i < parsedData[xIndex].length; i++) {
    if (i === xIndex) {
      continue;
    }

    if (Number(parsedData[yIndex][i]) >= Number(tree)) {
      firstPass = false;
      upScore++;
      break;
    }
    upScore++;
  }
  if (firstPass === null) {
    firstPass = true;
  }
  for (let i = xIndex - 1; i >= 0; i--) {
    if (i === xIndex) {
      continue;
    }

    if (Number(parsedData[yIndex][i]) >= Number(tree)) {
      secondPass = false;
      downScore++;
      break;
    }
    downScore++;
  }
  if (secondPass === null) {
    secondPass = true;
  }
  // console.log(
  //   `VERTICAL --- tree ${tree} at position [${xIndex}][${yIndex}], RESULT = ${upScore} - ${downScore}`
  // );
  return { upScore, downScore };
};

let visibleTrees = 0;
let maxScenicScore = 0;
for (let i = 0; i < parsedData.length; i++) {
  for (let j = 0; j < parsedData[i].length; j++) {
    let tree = Number(parsedData[i][j]);
    let v = isTreeVisibleVertical(tree, j, i);
    let h = isTreeVisibleHorizontal(tree, j, i);
    let scenicScore = v.upScore * v.downScore * h.upScore * h.downScore;

    if (scenicScore > maxScenicScore) {
      maxScenicScore = scenicScore;
    }
  }
}

console.log(maxScenicScore);
