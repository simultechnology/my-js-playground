/*
* 数値の範囲（{x: from <= x <= to}）を表すRangeオブジェクト。
* Rangeはhas()メソッドを持つ。このメソッドは指定された数値が、範囲に含まれるか
* どうかをテストする。Rangeは反復可能。範囲内のすべての整数に対して反復する。
*/
class Range {
  constructor (from, to, step = 1) {
    this.from = from;
    this.to = to;
    this.step = step;
  }

  // Rangeを数値のSetのように振る舞うようにする。
  has(x) {
    if (typeof x !== "number") return false;
    if (x < this.from || x > this.to) return false;
    return (x - this.from) % this.step === 0;
  }

  // 集合の記法形式の文字列表現を返す。
  toString() {
    if (this.step === 1) {
      return `{ x | ${this.from} ≤ x ≤ ${this.to} }`;
    } else {
      let res = [];
      for(let val = this.from; val <= this.to; val += this.step) {
        res.push(val);
      }
      return `{ ${res.join(', ')} }`;
    }
  }

  // Rangeを反復可能にするために、イテレータオブジェクトを返す。
  // このメソッドの名前は文字列ではなく、特別なSymbolであることに注意。
  [Symbol.iterator]() {
    // 各イテレータインスタンスは、ほかのインスタンスとは独立に範囲を反復
    // する必要がある。このため、状態変数を使って反復の位置を記憶する必要が
    // ある。まず、from以上の整数から始める。
    let next = Math.ceil(this.from);  // これが次に返す値。
    let last = this.to;               // this.toよりも大きな値は返さない。
    let step = this.step;
    return {                          // これがイテレータオブジェクト。
      // このnext()メソッドがあるので、イテレータオブジェクトになる。
      // イテレータオブジェクトは反復結果オブジェクトを返さなければならない。
      next() {
        if (next <= last) { // 最後の値を返していないのであれば、
          let currentValue = next;
          next += step;
          return { value: currentValue }; // 次の値を返して、次の値をインクリメントする。
        } else {
          return { done: true }; // 返していれば、反復完了を示す。
        }
      },

      // 利便性のために、イテレータ自体も反復可能にしておく。
      [Symbol.iterator]() { return this; }
    };
  }
}

export default Range
