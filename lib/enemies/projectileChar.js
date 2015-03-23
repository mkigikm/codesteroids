;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

var ProjectileChar = Asteroids.ProjectileChar = function (pos, char, goal) {
  Asteroids.Char.call(this, pos.copy(), char, ProjectileChar.ATTRS);
  this.guidance =
      new Asteroids.Guidance(ProjectileChar.LIMITS, null, this.speed);
  this.guidance.head.set(goal.subC(pos).norm());
  this.displacementTimer = new Asteroids.Util.Timer(this.maxDistance);
};

Asteroids.Util.inherits(Asteroids.ProjectileChar, Asteroids.Char);

ProjectileChar.prototype.move = function () {
  Asteroids.MovingObject.prototype.move.call(this);
  this.displacementTimer.tick(this.speed);
  this.remove = this.displacementTimer.off();
};

ProjectileChar.prototype.handleCollision = function (bullet) {
  this.remove = true;
};

ProjectileChar.prototype.hitShip = function () {
  this.remove = true;
}
})();
