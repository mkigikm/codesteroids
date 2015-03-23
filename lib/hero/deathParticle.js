;(function () {
if (typeof window.Asteroids === "undefined") {
  window.Asteroids = {};
}

var DeathParticle = Asteroids.DeathParticle = function (pos) {
  attrs  = Asteroids.DeathParticle.ATTRS;
  limits = Asteroids.DeathParticle.LIMITS;
  Asteroids.MovingObject.call(
    this,
    pos.copy().add(Asteroids.Vector.random(5)),
    attrs
  );

  this.guidance = new Asteroids.Guidance(
    limits, Asteroids.Vector.random(), this.speed
  );

  this.displacementTimer = new Asteroids.Util.Timer(this.maxDistance);
};

Asteroids.Util.inherits(DeathParticle, Asteroids.MovingObject);

DeathParticle.prototype.move = function () {
  Asteroids.MovingObject.prototype.move.call(this);
  this.displacementTimer.tick(this.speed);
};

DeathParticle.prototype.draw = function (ctx) {
  if (this.displacementTimer.on())
    Asteroids.MovingObject.prototype.draw.call(this, ctx);
};
})();
