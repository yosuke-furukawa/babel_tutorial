class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.health_ = 1000;
  }
  attack(character) {
    character.health_ -= 10;
  }
}

