;(function () {
if (typeof window.Asteroids === "undefined") {
  window.Asteroids = {};
}

var Bullet = Asteroids.Bullet = function (ship, rotate, attrs, limits) {
  attrs  || (attrs = Asteroids.Bullet.ATTRS);
  limits || (limits = Asteroids.Bullet.LIMITS);
  Asteroids.MovingObject.call(this, ship.pos.copy(), attrs);

  this.guidance = new Asteroids.Guidance(
    limits, ship.guidance.head.copy(), this.speed
  );
  this.displacementTimer = new Asteroids.Util.Timer(this.maxDistance);
  rotate && this.guidance.head.rot(rotate);
};

Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

Bullet.prototype.move = function () {
  Asteroids.MovingObject.prototype.move.call(this);
  this.displacementTimer.tick(this.speed);
  this.remove = this.displacementTimer.off();
};

Bullet.prototype.handleCollision = function (char) {
  if (this.remove) return;

  this.remove = true;
  char.handleCollision(this);
};
})();
