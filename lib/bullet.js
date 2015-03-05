;(function () {
if (typeof window.Asteroids === "undefined") {
  window.Asteroids = {};
}

var Bullet = Asteroids.Bullet = function (ship, rotate) {
  Asteroids.MovingObject.call(this, ship.pos.copy(), Bullet.ATTRS);

  this.guidance = new Asteroids.Guidance(Bullet.LIMITS,
      ship.guidance.head.copy(), this.speed);
  this.displacementTimer = new Asteroids.Util.Timer(this.maxDistance);
  this.bounces           = new Asteroids.Util.Timer(this.maxBounces);
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

  this.bounces.tick();
  this.remove = this.bounces.off();
  char.handleCollision(this);
};
})();
