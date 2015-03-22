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
