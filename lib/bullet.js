;(function () {
if (typeof window.Asteroids === "undefined") {
  window.Asteroids = {};
}

var Bullet = Asteroids.Bullet = function (ship) {
  Asteroids.MovingObject.call(this, ship.pos.copy(), Bullet.ATTRS);

  this.guidance = new Asteroids.Guidance(Bullet.LIMITS,
      ship.guidance.head.copy(), this.speed);
  this.displacementTimer = new Asteroids.Util.Timer(this.maxDistance);
  this.bounces           = new Asteroids.Util.Timer(this.maxBounces);
};

Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

Bullet.prototype.move = function (targets) {
  var target;

  targets = targets || [];
  Asteroids.MovingObject.prototype.move.call(this);
  this.displacementTimer.tick(this.speed);
  this.remove = this.displacementTimer.off();

  if (this.targeting()) {
    this.findTarget(targets);
    this.lockOnTarget();
  }
};

Bullet.prototype.targeting = function () {
  return this.bounces.atMax();
};

Bullet.prototype.findTarget = function (targets) {
  // if the target has been destroyed or is too far away, seek a new target
  this.loseTarget();
  // return if we already have a target or there are no targets left
  if (this.target || targets.length === 0) return;

  targets = _.filter(targets, function (target) {
    return this.dist(target.pos) < this.scanR;
  }, this);

  this.target = _.min(targets, function (target) {
    return this.dist(target.pos);
  }, this);

  _.isNumber(this.target) && (this.target = null);
};

Bullet.prototype.lockOnTarget = function () {
  this.target && this.guidance.seek(this.pos, this.target.pos);
};

Bullet.prototype.loseTarget = function () {
  if (!this.target) return;

  (this.target.remove || this.dist(this.target.pos) > this.lockR) &&
      (this.target = null);
};

Bullet.prototype.handleCollision = function (char) {
  if (this.remove) return;

  this.bounces.tick();
  this.target = null;
  this.remove = this.bounces.off();
  char.handleCollision(this);
};

Bullet.prototype.draw = function (ctx) {
  Asteroids.MovingObject.prototype.draw.call(this, ctx);

  if (this.target && this.displayTarg) {
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.lockR, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.strokeStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(this.target.pos.x, this.target.pos.y, 10, 0, 2 * Math.PI);
    ctx.stroke();
  } else if (this.targeting() && this.displayTarg) {
      ctx.strokeStyle = 'red';
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.scanR, 0, 2 * Math.PI);
      ctx.stroke();
  }
};
})();
