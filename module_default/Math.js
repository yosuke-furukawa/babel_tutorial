const PI = 3.141592;

function _sqrt(s, x, last){
  'use strict';
  if (x === last) return x;
  return _sqrt(s, (x + s / x) / 2.0, x);
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
