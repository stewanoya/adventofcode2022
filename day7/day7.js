import { readFile } from "node:fs/promises";
import { nextTick } from "node:process";
const filePath = "./input.txt";
const data = await readFile(filePath, { encoding: "utf8" });
const parsedData = data.split("\n").map((line) => line.split("\r")[0]);

let path = [];
const dirs = [];
const files = {};
const named = (file) => {
  return path.join("/") + "/" + file;
};

for (let line of parsedData) {
  if (line == "$ cd /") {
    path = [""];
  } else if (line.startsWith("$ cd")) {
    const [_, __, destination] = line.split(" ");

    if (destination == "..") {
      path.pop();
    } else {
      path.push(destination);
    }
  } else if (line == "$ ls") {
    continue;
  } else if (line.startsWith("dir")) {
    const [_, dir] = line.split(" ");

    dirs.push(named(dir));
  } else {
    const [size, name] = line.split(" ");

    files[named(name)] = Number(size);
  }
}
let dirSizes = {};
for (let dir of dirs) {
  for (let file of Object.entries(files)) {
    let [name, size] = file;

    if (name.includes(dir)) {
      dirSizes[name] ? (dirSizes[name] += size) : (dirSizes[name] = size);
    }
  }
}

let total = 0;

for (let size in dirSizes) {
  if (dirSizes[size] <= 100000) {
    total += dirSizes[size];
  }
}
console.log(total);
