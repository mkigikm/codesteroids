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
  this.max   = max;
};

Timer.prototype.tick = function (n) {
  n = n || 1;
  this.value = Math.max(this.value - n, 0);
};

Timer.prototype.on = function () {
  return !this.off();
};

Timer.prototype.off = function () {
  return this.value === 0;
};

Timer.prototype.reset = function () {
  this.value = this.max;
};
})();
