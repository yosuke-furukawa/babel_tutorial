"use strict";

exports.square = square;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var PI = 3.141592;

exports.PI = PI;
var _sqrt = (function (_sqrt2) {
  var _sqrtWrapper = function _sqrt(_x, _x2, _x3) {
    return _sqrt2.apply(this, arguments);
  };

  _sqrtWrapper.toString = function () {
    return _sqrt2.toString();
  };

  return _sqrtWrapper;
})(function (s, x, last) {
  return x != last ? _sqrt(s, (x + s / x) / 2, x) : x;
});
var sqrt = function sqrt(s) {
  return _sqrt(s, s / 2, 0);
};
exports.sqrt = sqrt;

function square(x) {
  return x * x;
}
