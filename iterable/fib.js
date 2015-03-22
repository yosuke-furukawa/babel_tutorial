
// 1000までの値を返すfibonacciを作る
var fibonacci = {
  // Symbol.iteratorを持つメソッドを持つオブジェクトにする
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    // iteratorオブジェクトは nextメソッドを持つオブジェクトを返す
    return {
      next() {
        // nextの中では返す値(value)と次で終わりかどうかを示すプロパティ(done)を返す
        [pre, cur] = [cur, pre + cur];
        if (pre < 1000)  return { done: false, value: pre };
        return { done: true };
      }
    }
  }
}

for (var n of fibonacci) {
  console.log(n);
}
