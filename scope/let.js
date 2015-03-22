{
  var a = 10;
  let b = 20;
  const tmp = a;
  a = b;
  b = tmp;
  // tmp = 30; // 再代入はできない
}

// a = 20、aはvarで宣言しているのでブロックスコープの外からも参照可能。
console.log(a);
// letで定義したbはブロックスコープの外からは解決できない、b is not defined
console.log(b);
// constもスコープの中でのみ有効、tmp is not defined
console.log(tmp);
