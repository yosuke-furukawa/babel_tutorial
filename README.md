# はじめに

Node.js日本ユーザーグループ代表の古川 (@yosuke_furukawa) です。るびま初投稿です。よろしくお願いいたします。

今日はJavaScriptの基本的な所に触れつつ、今後のJavaScriptである ECMAScript2015 (旧ECMAScript6) の話を中心にしようと思います。

ECMAScript2015(以下ES2015) は今年の6月に公式に次のECMAScriptとして仕様が公開されます。このECMAScriptの仕様に準拠した言語実装がJavaScriptであり、簡単に言ってしまえば *今後のブラウザ* ではこの ES2015 の仕様に準拠した新しいJavaScriptが使えるようになります。

ただし、それは今後のブラウザであって、現在普及しているブラウザでは使えません。ES2015の機能をサポートしたブラウザを待つのではなく、ES2015で記述し、それを現在普及しているブラウザでも扱えるようにするトランスパイラ *babel (旧6to5)* に関して今回は解説します。

またRubyを記述している方々の中ではウェブのアプリケーションを構築されている方も多いと思いますが、この *babel* は次の Sprockets の v4.x で導入が検討されており、新しいSprocketsではES6で記述することもできる可能性があります。

# トランスパイラで何が嬉しいのか

JavaScriptにおけるトランスパイラというのは、ES2015以降のセマンティクスで書かれたJavaScriptを現在使われているブラウザでも使えるようにするための変換処理をするツールです。

ES2015は仕様公開を6月に控えて、盛り上がりを見せています。
Chromeの開発ビルド(Canary)やFireFoxの開発版(Aurora)にも多くのES2015の機能追従がされてますし、一部の機能は既に今のブラウザでも扱えるようになっています。ただし、全ての機能セットを揃えたブラウザは今のところ存在しません。

さらに、JavaScriptには他の言語には必ずあるような一般的な機能が欠落している事も多く、それをカバーするためにUnderscoreといったライブラリやCoffeeScript, TypeScript, JSXといったaltJSが台頭しています。

ES2015に対応したJavaScirptを使うことで、ライブラリの機能が不要になり、依存ライブラリを減らすことができたり、altJSに頼らなくても豊富な言語機能が扱える可能性が広がります。

また数年後にはES2015が広まっていることを考えるとその時までにES2015の新文法、新機能に慣れておいたほうがスムーズな移行が期待できます。

# ECMAScript 2015 について

ECMAScript 2015には、下記の仕様が機能として追加されます。

- let/const といった Blocking Scope
- Map/Set/WeakMap/WeakSet といった Collections
- 型を定義するClass
- Generator/for..of
- Promises
- Template String Literals
- Arrow Functions
- modules

# babel について

今一番更新がホットな トランスパイラの一つです。他にもトランスパイラはいくつか存在しますが、新しい文法を一番サポートしているのが babel になります。ちなみに英語読みで "ベーベル" と読みます。

babelサポート文法一覧

![babelサポート文法一覧](http://i.gyazo.com/e1737a869c61e12187298b5fe7c06e27.png)

http://kangax.github.io/compat-table/es6/

## babel インストール

npmを利用します。 node.jsをインストールしておいてください。

```
$ npm install babel -g
```

こうすると3つのコマンドラインツールがインストールされます。

- babel (babelの基本コマンド、本コマンドを利用すればES2015で記述されたJavaScriptファイルをトランスパイルできる)
- babel-node (babelでのトランスパイルをした上でコードをnodeで実行するためのコマンド、REPLにもなる)
- babel-external-helpers (babelのutilityをbabelの外からも使えるようにするためのコマンド)

簡単な使い方としては下記の通り

```
# babel filename でトランスパイルすると標準出力に結果が出る
$ babel test.js

# babel -o を使うと出力先ファイルを指定できる
$ babel -o test2.js test.js

# babel -w を使うと変更を監視してファイルを出力できる
$ babel -w test.js -o test2.js

# ソースマップを付ける場合は -s, インラインソースマップが欲しいなら -t
$ babel -s -t -w test.js -o test2.js
```

トランスパイルではなく、スクリプトとしてそのまま実行することもできます。
実行したい場合は babel-node を使います。

```
$ babel-node test.js
```

ファイルを省略して実行すると、簡単なREPLにもなります。ただし、開業する度に逐次実行されるため、今のところ一行で全て書く必要があるのでREPLとしての利用はオススメはしません。

```
$ babel-node
> [0, 1, 2, 3].map((x)=>x*x);
[ 0, 1, 4, 9 ]
```

## Sprocketsで使う方法

`sprockets-es6` を使います。

```
$ gem install sprockets-es6
```

```
# Gemfile
gem "sprockets"
gem "sprockets-es6"
```

```
require "sprockets/es6"
```

これで使えるようになります。

## gulp/gruntなどで使う方法

これもさほど変わりません。grunt-babel, gulp-babelがあるのでそれを利用しましょう。

```
$ npm install grunt-babel load-grunt-tasks -D
```

```
require("load-grunt-tasks")(grunt);
grunt.initConfig({
  "babel": {
    options: {
      // ソースマップが要らない場合は false にする
      sourceMap: true
    },
    dist: {
      files: {
        "dist/app.js": "src/app.js"
      }
    }
  }
});

grunt.registerTask("default", ["babel"]);
```

これで `grunt` コマンドを実行すればbabelが実行されます。
また gulp の場合は以下のようにします。

```
$ npm install gulp-babel gulp-sourcemaps gulp-concat -D
```

```
var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

gulp.task("default", function () {
  return gulp.src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("all.js"))
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});
```
これで `gulp` コマンドを実行すればbabelでトランスパイルされます。

# ECMAScript 2015で変わるJavaScriptの書き方

ES2015にはここでは紹介しきれないほどの機能が入っています。個人的に重要だと思っているものは紹介しますが、全てを見てみたい場合は[ES2015のドラフトをご一読下さい](http://people.mozilla.org/~jorendorff/es6-draft.html)。

ES2015の目標は先程のドラフトに記述されていて、

```
ECMAScript 第6版のゴールには以下のものが含まれている。

- 大規模アプリ開発の支援
- ライブラリ構築の支援
- 他の言語からのコンパイル対象として利用されること

具体的なエンハンスとして、

- モジュール化
- クラス定義
- ブロックスコープ
- iteratorとgenerator
- 非同期プログラミングのためのPromise
- デストラクチャリング
- 末尾呼び出し最適化

といった機能が含まれている。

また、ECMAScriptのライブラリとしてmapやset、binary配列、Unicode補助文字、正規表現拡張がbuilt-inで追加されている。
これらのbuild-inはサブクラスとして拡張するのも可能とする。
```

という風になっています。つまり、大規模開発に耐えるため、適切にモジュール化をすること、適切な単位でクラスを設計してブロックスコープにより、変数を限定的に扱うことなどができるようになりました。

また非同期プログラミングに関してはPromiseとして非同期処理を抽象化する事ができるようになりました。さらにiteratorやgeneratorを扱う事で遅延繰り返し処理を扱うことができるようになりました。これらの機能は関数型言語の流れを汲んでいると筆者は捉えていて、また末尾呼び出し最適化もこの流れを汲んだ機能追加であると捉えています。

では、これらの機能に対して一つ一つ紹介していきます。また、本当はこの他にもTemplate String LiteralsとかArrow Functionsなどが定義されていますが、この記事では説明を省きます。

## モジュール化

モジュールを切り出すことができるようになりました。これまでJavaScriptでは言語レベルでモジュールの分割ができませんでした。そのため、JavaScriptをモジュール化してフロントで読み込む際には require.js 使ったり、 browserify 使ったりというライブラリで解決するか、 global空間に独自の名前空間を作ってそこに生やすといった処理がされてきました。

ES2015からはこのモジュール化をするための専用の構文 `export` と `import` が使えるようになりました。

基本的には commonjs と似ています、つまり、 export でオブジェクトをimportできるようにして、requireの代わりに import 構文でオブジェクトを利用できるようにします。

### 名前付きの export

では実際にモジュールを使ってコードを書いてみましょう。

下記のようなファイルを作成し、`Math.js` のような名前をつけておきます。

```javascript
"use strict";

// export 構文で外部から読み込めるようにする
// exportする場合は以下のようにする
export const PI = 3.141592;

// importさせないものは export をつけないでおく
const _sqrt = function(s, x, last){
  return x != last ? _sqrt(s, (x + s / x) / 2.0, x) : x;
};

// 関数に対してもexport 可能
// 平方根を求める (バビロニアの平方根アルゴリズム)
export const sqrt = function(s){
  return _sqrt(s, s/2.0, 0.0);
};

// 二乗を求める
export function square(x) {
  return x * x;
}
```

これはちょうど commonjs で以下のように記述しているのと同じです。 node.js もしくは browserify を使ってコードを書いたことがある方であれば馴染み深い書き方かと思います。

```javascript
// Math.js

export.PI = 3.141592;

var _sqrt = function(s, x, last){
  return x != last ? _sqrt(s, (x + s / x) / 2.0, x) : x;
};
export.sqrt = function(s){
  return _sqrt(s, s/2.0, 0.0);
};
export.square(x) {
  return x * x;
};
```


同様に下記のようなファイルを作成し、 `Main.js` のような名前をつけておきます。
同じフォルダ内においてください。

```javascript
import {PI, sqrt, square} from './Math';
console.log(PI); // 3.141592
console.log(sqrt(121)); // 11
console.log(square(11)); // 121
```

実際にbabel-nodeを使ってコードを実行してみましょう。

```
$ babel-node Main.js
3.141592
11
121
```

このように`export`構文を使うと`import`で読み込んで利用できるようになります。

名前付きのimport ではなく、exportされているものを全て一つのオブジェクトにimport場合は以下のように書きます。

```javascript
import * as Math from './Math';
console.log(Math.PI); // 3.141592
console.log(Math.sqrt(121)); // 11
console.log(Math.square(11)); // 121
```

### デフォルトの export 

名前付きのexportは明示的にexportするものを選択できるものの、毎回 export って書かなきゃいけないのは面倒な時もあります。Node.js コミュニティでは基本的に一つのファイルに対して、一つのオブジェクトだけを export して、書くことが多いです。`default` 構文を使うと、これを解決できます。

```javascript
const PI = 3.141592;

const _sqrt = function(s, x, last){
  return x != last ? _sqrt(s, (x + s / x) / 2.0, x) : x;
};

const sqrt = function(s){
  return _sqrt(s, s/2.0, 0.0);
};

const square = function(x) {
  return x * x;
};

export default Math = {
  PI: PI,
  sqrt: sqrt,
  square: square
};
```

importする側ではこう書きます。

```javascript
import Math from './Math';
console.log(Math.PI);
console.log(Math.sqrt(121));
console.log(Math.square(11));
```

後述しますが、export default 構文は class 定義と組み合わせて使うことが多くなると思います。定義したクラスをdefault exportして外からimportできるようにする、という書き方が多くなると思われます。

## クラス定義

JavaScriptでクラスライクなものを作るときは、コンストラクタとして関数を定義し、prototypeに対してメソッドを定義することで実現してきました。このようなJavaScriptをよく見るかと思います。

```javascript
var Character = function(x, y) {
  this.x = x;
  this.y = y;
  this.health_ = 100;
}
Character.prototype.attack = function(character) {
  character.health_ -= 10;
};
```

これの糖衣構文としてclassが追加されました。class構文を使うと以下のように記述することができます。

```javascript
class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.health_ = 100;
  }
  attack(character) {
    character.health_ -= 10;
  }
}
```

さっきの書き方よりもスッキリ定義できる上に、クラスであることが直感的に分かるようになりました。以前の書き方は関数定義と同じく `function` を使った書き方なので、一見しただけでは関数なのか class なのか分かりにくいです。

また先程の moduleの default export と組み合わせて、下記のように class を公開するやり方がES6ベースで記述されたモジュールによく見られます。

```javascript
export default class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.health_ = 100;
  }
  attack(character) {
    character.health_ -= 10;
  }
}
```

さて、classがあるということは継承も存在します。
継承を使うと以下のように記述できます。

```javascript
// Characterクラス
class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.health_ = 100;
  }
  attack(character) {
    character.health_ -= 10;
  }
}

// 当然継承もある。
// Monsterクラスに継承
class Monster extends Character {
  constructor(x, y, name) {
    super(x, y);
    this.name = name;
  }

  // メソッド書くときはこう書く
  attack(character) {
    // 親クラスのメソッド呼ぶときはこう
    super.attack(character);
    // super(character)でも同じ意味になる
  }

  // get prefixを付けられる
  get isAlive() { return this.health_ > 0; }
  get health() { return this.health_; }
  // set prefixを付けられる
  set health(value) {
    if (value < 0) throw new Error('Health must be non-negative.');
    this.health_ = value;
  }
}
var myMonster = new Monster(5,1, 'arrrg');
var yourMonster = new Monster(5,1, 'nyan');
// get prefixをつけるとプロパティアクセスのようにメソッドを扱える
console.log(myMonster.health); // 100
console.log(myMonster.isAlive); // true
// set prefixでも同様。
myMonster.health = 1;
console.log(myMonster.health); // 1
console.log(myMonster.isAlive); // true

myMonster.attack(yourMonster);
console.log(yourMonster.health); //90
```

これまでの `function` と `prototype` を使った書き方よりも直感的な書き方が期待できます。

## ブロックスコープ (let/const)

let, constという新しい変数宣言ができるようになりました。これはblockスコープと呼ばれています。JavaScriptの場合、変数の生存するスコープを表現するのにfunctionで囲む必要がありました。しかし、let/constを使うことで、functionだけではなくブレース`{ ... }`で囲まれた領域がスコープになります。

letは再代入可能な変数ですが、constは再代入不可能な変数です。constはちょうど Java で言うところの final があたったような状態になります。

```javascript
// block.js
{
  var a = 10;
  let b = 20;
  const tmp = a;
  a = b;
  b = tmp;
  // tmp = 30; 再代入はできない SyntaxErrorになる。
}

// a = 20、aはvarで宣言しているのでブロックスコープの外からも参照可能。
console.log(a);
// letで定義したbはブロックスコープの外からは解決できない、ReferenceError b is not defined になる。
console.log(b);
// constもスコープの中でのみ有効、tmp is not defined
console.log(tmp);
```

## iterator と generator

ES2015から、新しく `for of` という文法が追加されました。これは繰り返しをおこなう `for` 文の拡張です。以下の様な記述を行います。

```javascript
var res = [];
// ここが for of 文
for (let element of [1, 2, 3]) {
  res.push(element * element);
}
console.log(res); // [1, 4, 9]
```

これまでの for 文と何が違うのでしょうか。これまでの for in 文と異なり、 of に渡すのはコレクションに限りません。
繰り返し可能なもの、Iterable なものであれば for of 文で繰り返すことができます。

Iterable なものを作るには、 `Symbol.Iterator` を使います。 `Symbol.Iterator` の定義は下記の通り。

```javascript
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
```

こうすると、繰り返し可能な任意のオブジェクトを実装することができます。ただし、Symbol.Iteratorを使ったやり方は見て頂いて分かる通り、書きやすいものではありません。もう少し簡潔にIterableなオブジェクトを作るには `generator` を利用します。

```javascript
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
```

## Promises

成功するか失敗するか分からない非同期の抽象化された状態を持つのが `Promise` です。

```javascript
function timeout(ms) {
  // Promiseのresolve関数を受け取る
  return new Promise((onFulfilled, onRejected) => {
    // 50%の確率でonFulfilled, onRejectedが呼ばれる
    setTimeout(() => Math.random() > 0.5 ?  onFulfilled() : onRejected(), ms);
  });
}

function log() {
  console.log('done');
}

function error() {
  console.log('error');
}

// onFulfilledが出たらdone、onRejectedだったらerrorと表示する
timeout(100).then(log).catch(error)
```

## デストラクチャリング

デストラクチャリング、和訳すると分配束縛と呼ばれる機能です。Clojureにある機能ですね。
これを利用すると配列やオブジェクトで設定した値を取り出しやすくなります。

具体的には以下のとおり。

```javascript
var hoge = 123;
var fuga =456;

// 値をswapする
var [fuga, hoge] = [hoge, fuga];

console.log(hoge); // 456
console.log(fuga); // 123

var [a, [b], [c], d] = ['hello', [', ', 'junk'], ['world']];

console.log(a + b + c); //hello, world (aに"hello", bに",", cに"world"が入ってる )

var pt = {x: 123, y: 444};
var {x, y} = pt;
console.log(x, y); // 123 444
```

## 末尾呼び出し最適化

関数の末尾にある再帰呼び出しを関数で呼ぶのではなく、内部でループに置換することで関数呼び出しのスタック累積をなくし、効率化するという方法です。

moduleの時に利用したバビロニアの平方根アルゴリズムを元に解説します。ちなみに2015年3月現在、数多く存在するブラウザ、トランスパイラの中でこの末尾呼び出し最適化を実装しているのは `babel` だけです。

```javascript
// バビロニアの平方根
// 関数の最後に再帰呼び出しを利用している事がわかる。
function _sqrt(s, x, last){
  'use strict';
  if (x === last) return x;
  return _sqrt(s, (x + s / x) / 2.0, x);
};

const sqrt = function(s){
  return _sqrt(s, s/2.0, 0.0);
};
```

babelでトランスパイルすると下記のようになります。

```javascript
function _sqrt(_x, _x2, _x3) {
  var _again = true;

  _function: while (_again) {
    "use strict";
    _again = false;
    var s = _x,
        x = _x2,
        last = _x3;
    if (x === last) {
      return x;
    }_x = s;
    _x2 = (x + s / x) / 2;
    _x3 = x;
    _again = true;
    continue _function;
  }
};

var sqrt = function sqrt(s) {
  return _sqrt(s, s / 2, 0);
};

```

`_sqrt` 関数の再帰呼び出しが消えて `while` と ラベル付き `continue` を使ったループ処理に変換されていることが分かります。
再帰呼び出しは直感的で副作用を少なくすることができる書き方だと言われていますが、関数スタックサイズを消費してしまうため、実行コストがかかります。関数のコールスタックを減らして最適化するのが末尾呼び出し最適化であり、ES2015の仕様として策定されています。

## etc, etc...

この他にも `=>` で関数を定義する Arrow Functions や 変数埋め込みやヒアドキュメントとしても利用可能な Template String Literals、SymbolsやProxy等、語り尽くせないほど機能があります。

# 今後のECMAScript2015 の展望

上に挙げた事からも分かる通り、 JavaScript に class や module の考え方が入り、適切な単位でモジュールとクラスを分割して設計することができるようになりました。またletやconstで変数の生存範囲を限定する事ができるようになりました。これらの機能は大規模なアプリを開発する時やライブラリを作る際の助けになるはずです。

また、generator/iterator/Promise といった関数型プログラミングの概念が導入され、さらに末尾呼び出し最適化といった副作用を少なくする記述方法ができるようになりました。ES6にはES5までの考え方にはないモダンな機能が入っています。

既にECMAScriptの仕様を決めている団体は次のES7に向けて準備をしています。現時点ではまだまだ検討中ですが、 `async-await` といった非同期呼び出しを同期っぽく呼び出すC#にある機能であったり、Optional Typingの機能をもたらす `types` や Objectの監視をする `Object.observe` といった機能が検討されています。

これらの機能が全てのブラウザで書けるようになるのはまだまだ先ですが、 `babel` にはいくつか実験的に先行実装されている [ES7 の機能](http://babeljs.io/docs/usage/transformers/#es7-experimental-)もあります。また `babel` 単体ではサポートしていなくても `flow` とあわせることで型チェックを実現したり、`jsx` とあわせることで 故E4X のような XMLリテラルを記述することができるようになっています。

ここでは紹介しきれませんでしたが、 `babel` にはこの他にも[未定義の変数/関数をチェックする機能](http://babeljs.io/docs/usage/transformers/validation/undeclared-variable-check/)や通らないコードを削除する[デッドコード削除の機能](http://babeljs.io/docs/usage/transformers/utility/dead-code-elimination/)、[インライン展開をする機能](http://babeljs.io/docs/usage/transformers/utility/inline-expressions)などの最適化が入っており、大変高機能になっています。

# まとめ

今後の JavaScript である ES6 の話をトランスパイラである `babel` とともに説明しました。
ES6の仕様は固まってきてはいるものの、今は仕様のフィードバックを求めている状況であり、この段階で積極的にES6を利用していく事で、ES6の盛り上げを図りたいと思っています。バグや問題があれば[フィードバック](https://esdiscuss.org/)すれば改修される可能性もあります。

是非使ってみてください。

# 参考文献

- [babel](http://babeljs.io/)
- [ES6 spec draft](http://people.mozilla.org/~jorendorff/es6-draft.html)
- [modules](http://www.2ality.com/2014/09/es6-modules-final.html)
- [Class構文が実装された](http://js-next.hatenablog.com/entry/2014/11/01/034607)
- [Sprocketsでの指定](http://babeljs.io/docs/using-babel/#sprockets)
- [Class](http://www.sitepoint.com/understanding-ecmascript-6-class-inheritance/)
- [traceur-compiler入門](http://yosuke-furukawa.hatenablog.com/entry/2014/07/31/093041#2)

