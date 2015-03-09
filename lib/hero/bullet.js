;(function () {
if (typeof window.Asteroids === "undefined") {
  window.Asteroids = {};
}

var Bullet = Asteroids.Bullet = function (ship, rotate, party, attrs, limits) {
  attrs  || (attrs = Asteroids.Bullet.ATTRS);
  limits || (limits = Asteroids.Bullet.LIMITS);
  Asteroids.MovingObject.call(this, ship.pos.copy(), attrs);

  this.guidance = new Asteroids.Guidance(
    limits, ship.guidance.head.copy(), this.speed
  );
  this.displacementTimer = new Asteroids.Util.Timer(this.maxDistance);
  rotate && this.guidance.head.rot(rotate);
  if (party) {
    this.color = _.sample(["#FF0000", "#FF7F00", "#FFFF00", "#00FF00",
        "#0000FF", "#4B0082", "#8B00FF"]);
  }
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
