import { readFile } from "node:fs/promises";
// 1 ROCK - A  ->  X
// 2 PAPER - B ->  Y
// 3 SCISS - C ->  Z
// L 0 - T 3 - W 6

const POINT_VALUES = {
  A: 1,
  X: 1,
  B: 2,
  Y: 2,
  C: 3,
  Z: 3,
};

const LETTER_TO_STRING = {
  A: "rock",
  X: "rock",
  B: "paper",
  Y: "paper",
  C: "scissors",
  Z: "scissors",
};

const getWinningChoice = (oppChoice) => {
  switch (oppChoice) {
    case "rock":
      return "Y";
    case "scissors":
      return "X";
    case "paper":
      return "Z";
  }
};

const getLosingChoice = (oppChoice) => {
  switch (oppChoice) {
    case "rock":
      return "Z";
    case "scissors":
      return "Y";
    case "paper":
      return "X";
  }
};

const filePath = "./input.txt";

const data = await readFile(filePath, { encoding: "utf8" });

let parsedData = data.split("\n").map((tuple) => tuple.split("\r")[0]);
const totalScore = (data) => {
  let score = 0;
  for (let round of data) {
    let opp = round[0];
    let me;

    if (round[2] === "X") {
      me = getLosingChoice(LETTER_TO_STRING[opp]);
    }
    if (round[2] === "Z") {
      me = getWinningChoice(LETTER_TO_STRING[opp]);
    }
    if (round[2] === "Y") {
      me = opp;
    }

    score += POINT_VALUES[me];

    if (LETTER_TO_STRING[opp] === LETTER_TO_STRING[me]) {
      score += 3;
      continue;
    }

    if (LETTER_TO_STRING[opp] === "scissors") {
      if (LETTER_TO_STRING[me] === "rock") {
        score += 6;
        continue;
      }
      continue;
    }

    if (LETTER_TO_STRING[opp] === "rock") {
      if (LETTER_TO_STRING[me] === "paper") {
        score += 6;
        continue;
      }
      continue;
    }

    if (LETTER_TO_STRING[opp] === "paper") {
      if (LETTER_TO_STRING[me] === "scissors") {
        score += 6;
        continue;
      }
      continue;
    }
  }

  return score;
};

console.log(totalScore(parsedData));
