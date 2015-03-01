;(function () {
if (typeof window.Asteroids === "undefined") {
  window.Asteroids = {};
}

var Bullet = Asteroids.Bullet = function (keys) {
  Asteroids.MovingObject.call(this, _.extend(keys, Bullet.DEFAULTS));
};

Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

Bullet.prototype.isWrappable = function () {
  return false;
};

Bullet.prototype.move = function () {
  Asteroids.MovingObject.prototype.move.call(this);
  this.remove = Asteroids.Game.outOfBounds(this.pos);
};

Bullet.prototype.handleCollision = function (char) {
  if (this.remove) {
    return;
  }
  this.remove = true;
  char.handleCollision(this);
};
})();
