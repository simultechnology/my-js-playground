import Range from "./range.js";

console.log('start!');

let chars = [..."abcd"];

for (let c of chars) {
  console.log(c);
}

let m = new Map(
  [
    ["one", 1],
    ["two", 2]
  ]
);

console.log(m);

let m2 = {
  "three": 3,
  "four": 4
};

console.log(m2);

console.log([...m]);

for (let x of new Range(1,10)) console.log(x); // 1から10までをログに記録する。
console.log([...new Range(-2,2)]);