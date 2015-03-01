;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

var RotChar = Asteroids.RotChar = function (keys) {
  Asteroids.Char.call(this, keys);
};

Asteroids.Util.inherits(Asteroids.RotChar, Asteroids.Char);

RotChar.prototype.rotate = function () {
  this.pos.add(this.center, -1).rot(RotChar.SPIN_ANGLE).add(this.center);
  this.center = null;
};

RotChar.prototype.handleCollision = function () {
  var leftHead  = Asteroids.Vector.random(1),
      rightHead = Asteroids.Vector.random(1);

  this.remove = true;
  this.left  && this.left. setKeys({head:  leftHead},  "left");
  this.right && this.right.setKeys({head: rightHead}, "right");

  this.left  && (this.left.right = null);
  this.right && (this.right.left = null);
  this.left = this.right = null;
};

RotChar.prototype.move = function () {
  this.wrapLine();
  this.rotate();
  Asteroids.MovingObject.prototype.move.call(this);
};
})();
