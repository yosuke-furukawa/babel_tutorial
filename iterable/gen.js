// 1000までの値を返すfibonacciを作る
let fibonacci = function*(){
    let pre = 0, cur = 1;
    while (pre < 1000) {
      // ここでdestructuringで値をswapさせる。
      [pre, cur] = [cur, pre + cur];
      // yieldで値を返す
      yield pre;
    }
}();

for (let n of fibonacci) {
  console.log(n);
}
