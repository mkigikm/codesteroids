;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

var AttackChar = Asteroids.AttackChar = function (keys) {
  Asteroids.Char.call(this, keys);
};

Asteroids.Util.inherits(Asteroids.AttackChar, Asteroids.Char);

AttackChar.prototype.handleCollision = function () {
  if (--this.line.health === 0) {
    this.remove = true;
    this.setKeys({remove: true}, "left");
    this.setKeys({remove: true}, "right");
  }
};

AttackChar.prototype.turn = function () {
  if (this.coordinator() && --this.line.turnCounter === 0) {
    this.line.turnCounter = AttackChar.LINE_DEFAULTS.turnCounter;
    this.head.rot(this.line.sign * this.line.turnAngle);
    this.line.sign *= -1;
  }
};

AttackChar.prototype.coordinator = function () {
  return this.left === null;
};

AttackChar.prototype.move = function () {
  this.turn();
  this.wrapLine();
  Asteroids.MovingObject.prototype.move.call(this);
  this.center = null;
};
})();
