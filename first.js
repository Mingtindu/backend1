// modules
// common js modules
// uses modules.exports and require()
// example
// destructuring
// import { mul } from "./mul.js";

// let object1 = {
//   name: "Ram",
//   age: 12,
// };
// const math = require("./sum");

// const { name, age } = object1;

// console.log(name, age);

// console.log(mul(1,2))

// ES modules
// used export and import
// supports default & named exports

// built in modules
// fs

import fs from "fs";
import path from "path";
import os from "os";

fs.writeFileSync("same.txt", "Hello this is sample text");

const data = fs.readFileSync("same.txt", "utf-8");
console.log(data);

console.log(os.platform());
console.log(os.arch());
console.log(os.totalmem());
console.log(os.freemem());
console.log(os.uptime());

const filePath = "ram/docs/letter.docs";
console.log("base Name", path.basename(filePath));
console.log(" Directory Name", path.dirname(filePath));
console.log("File extension ", path.extname(filePath));
