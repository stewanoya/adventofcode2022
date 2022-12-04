import { readFile } from "node:fs/promises";
const filePath = "./input.txt";

const data = await readFile(filePath, { encoding: "utf8" });

const parsedData = data.split("\n").map((line) => line.split("\r")[0]);
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

const getMatchingItemTypes = (line1, line2, line3) => {
  if (line3) {
    for (let letter of getLongestLine(line1, line2, line3)) {
      if (
        line1.includes(letter) &&
        line2.includes(letter) &&
        line3.includes(letter)
      ) {
        return letter;
      }
    }
  }

  for (let letter of line1) {
    if (line2.includes(letter)) {
      return letter;
    }
  }
};

const getLongestLine = (line1, line2, line3) => {
  if (line1.length >= line2.length && line1.length >= line3.length) {
    return line1;
  }

  if (line2.length >= line1.length && line2.length >= line3.length) {
    return line2;
  }

  return line3;
};

const getAllMistakes = (data) => {
  let matches = [];

  for (let line of data) {
    let middle = line.length / 2;
    let firstHalf = line.substring(0, middle);
    let secHalf = line.substring(middle, line.length);

    let matchingItem = getMatchingItemTypes(firstHalf, secHalf);

    if (matchingItem) {
      matches.push(matchingItem);
    }
  }
  return matches;
};

const mistakes = getAllMistakes(parsedData);

const getPriority = (letter) => {
  return isLetterUppercase(letter)
    ? alphabet.indexOf(letter.toUpperCase()) + 27
    : alphabet.indexOf(letter.toUpperCase()) + 1;
};

const isLetterUppercase = (letter) => {
  return letter === letter.toUpperCase();
};

let totalPriority = 0;

// for (let mistake of mistakes) {
//   totalPriority += getPriority(mistake);
// }

const getAllBadges = (data) => {
  const badges = [];
  for (let i = 0; i < data.length; i += 3) {
    let first = data[i];
    let second = data[i + 1];
    let third = data[i + 2];

    let badge = getMatchingItemTypes(first, second, third);

    badges.push(badge);
  }
  return badges;
};

const badges = getAllBadges(parsedData);
console.log(badges);
for (let badge of badges) {
  totalPriority += getPriority(badge);
}

console.log(totalPriority);
