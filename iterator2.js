import Range from "./range.js";

console.log('start!');

function map(iterable, f) {
  let iterator = iterable[Symbol.iterator]();
  return {    // このオブジェクトはイテレータであり、反復可能でもある。
    [Symbol.iterator]() { return this; },
    next() {
      let v = iterator.next();
      if (v.done) {
        return v;
      } else {
        return { value: f(v.value) };
      }
    }
  };
}


console.log([...map(new Range(1,30), x => x*x)]);  // => [1, 4, 9, 16]
console.log([...map(new Range(1,30,6), x => x*x)]);  // => [1, 4, 9, 16]


// 指定したiterableをフィルタした反復可能なオブジェクトを返す。
// predicateがtrueを返す要素のみを反復する。
function filter(iterable, predicate) {
  let iterator = iterable[Symbol.iterator]();
  return {    // このオブジェクトはイテレータであり、反復可能でもある。
    [Symbol.iterator]() { return this; },
    next() {
      for(;;) {
        let v = iterator.next();
        if (v.done || predicate(v.value)) {
          return v;
        }
      }
    }
  };
}

// 偶数だけが残るようにフィルタする。
[...filter(new Range(1,10), x => x % 2 === 0)]  // => [2,4,6,8,10]