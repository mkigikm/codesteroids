;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

Asteroids.Util = {};

Asteroids.Util.inherits = function (ChildClass, ParentClass) {
  var Surrogate = function () {};

  Surrogate.prototype = ParentClass.prototype;
  ChildClass.prototype = new Surrogate();
};

var Timer = Asteroids.Util.Timer = function (start, max) {
  this.value = start;
  this.max   = max || start;
};

Timer.prototype.tick = function (n) {
  n = n || 1;
  return this.value = Math.max(this.value - n, 0);
};

Timer.prototype.tock = function (n) {
  n = n || 1;
  return this.value = Math.min(this.value + 1, this.max);
};

Timer.prototype.on = function () {
  return !this.off();
};

Timer.prototype.off = function () {
  return this.value === 0;
};

Timer.prototype.set = function (value) {
  this.value = value;
};

Timer.prototype.reset = function () {
  this.set(this.max);
};

Timer.prototype.zero = function () {
  this.set(0);
};

Timer.prototype.atMax = function () {
  return this.value === this.max;
};

Asteroids.Util.sign = function (n) {
  return n < 0 ? -1 : 1;
};

Asteroids.Util.bringInRange = function (n, range) {
  var max, min;

  if (range instanceof Object) {
    max = range.max;
    min = range.min;
  } else {
    max = range;
    min = -range;
  }

  if (n > max) n = max;
  else if (n < min) n = min;

  return n;
};

Asteroids.Util.inRange = function (n, range) {
  var max, min;

  if (range instanceof Object) {
    max = range.max;
    min = range.min;
  } else {
    max = range;
    min = -range;
  }

  return n <= max && n >= min;
};
})();
