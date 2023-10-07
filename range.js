/*
* 数値の範囲（{x: from <= x <= to}）を表すRangeオブジェクト。
* Rangeはhas()メソッドを持つ。このメソッドは指定された数値が、範囲に含まれるか
* どうかをテストする。Rangeは反復可能。範囲内のすべての整数に対して反復する。
*/
class Range {
  constructor (from, to) {
    this.from = from;
    this.to = to;
  }

  // Rangeを数値のSetのように振る舞うようにする。
  has(x) { return typeof x === "number" && this.from <= x && x <= this.to; }

  // 集合の記法形式の文字列表現を返す。
  toString() { return `{ x | ${this.from} ≤ x ≤ ${this.to} }`; }

  // Rangeを反復可能にするために、イテレータオブジェクトを返す。
  // このメソッドの名前は文字列ではなく、特別なSymbolであることに注意。
  [Symbol.iterator]() {
    // 各イテレータインスタンスは、ほかのインスタンスとは独立に範囲を反復
    // する必要がある。このため、状態変数を使って反復の位置を記憶する必要が
    // ある。まず、from以上の整数から始める。
    let next = Math.ceil(this.from);  // これが次に返す値。
    let last = this.to;               // this.toよりも大きな値は返さない。
    return {                          // これがイテレータオブジェクト。
      // このnext()メソッドがあるので、イテレータオブジェクトになる。
      // イテレータオブジェクトは反復結果オブジェクトを返さなければならない。
      next() {
        return (next <= last)   // 最後の値を返していないのであれば、
          ? { value: next++ } // 次の値を返して、次の値をインクリメントする。
          : { done: true };   // 返していれば、反復完了を示す。
      },

      // 利便性のために、イテレータ自体も反復可能にしておく。
      [Symbol.iterator]() { return this; }
    };
  }
}

export default Range
