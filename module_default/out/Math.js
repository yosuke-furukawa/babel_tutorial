"use strict";

var PI = 3.141592;

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

var square = function square(x) {
  return x * x;
};

module.exports = Math = {
  PI: PI,
  sqrt: sqrt,
  square: square
};
