"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Character = (function () {
  function Character(x, y) {
    _classCallCheck(this, Character);

    this.x = x;
    this.y = y;
    this.health_ = 1000;
  }

  _createClass(Character, {
    attack: {
      value: function attack(character) {
        character.health_ -= 10;
      }
    }
  });

  return Character;
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNoYXJhY3Rlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBTSxTQUFTO0FBQ0YsV0FEUCxTQUFTLENBQ0QsQ0FBQyxFQUFFLENBQUMsRUFBRTswQkFEZCxTQUFTOztBQUVYLFFBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ1gsUUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDWCxRQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztHQUNyQjs7ZUFMRyxTQUFTO0FBTWIsVUFBTTthQUFBLGdCQUFDLFNBQVMsRUFBRTtBQUNoQixpQkFBUyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7T0FDekI7Ozs7U0FSRyxTQUFTIiwiZmlsZSI6InQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBDaGFyYWN0ZXIge1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuaGVhbHRoXyA9IDEwMDA7XG4gIH1cbiAgYXR0YWNrKGNoYXJhY3Rlcikge1xuICAgIGNoYXJhY3Rlci5oZWFsdGhfIC09IDEwO1xuICB9XG59XG5cbiJdfQ==
//# sourceMappingURL=t.js.map