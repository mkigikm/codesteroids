;(function () {
if (typeof window.Asteroids === "undefined") {
  window.Asteroids = {};
}

var GuidedBullet = Asteroids.GuidedBullet = function (ship, limits) {
  Asteroids.Bullet.call(this, ship, 0, Asteroids.GuidedBullet.ATTRS, limits);
};

Asteroids.Util.inherits(GuidedBullet, Asteroids.Bullet);

GuidedBullet.prototype.move = function (targets) {
  var target = targets || [];

  Asteroids.Bullet.prototype.move.call(this);

  this.findTarget(targets);
  this.lockOnTarget();
};

GuidedBullet.prototype.findTarget = function (targets) {
  // if the target has been destroyed or is too far away, seek a new target
  this.loseTarget();
  // return if we already have a target
  if (this.target) return;

  this.target = _.chain(targets)
    .filter(
      function (target) { return this.dist(target.pos) < this.scanR }, this
    )
    .min(function (target) { return this.dist(target) }, this)
    .value();

  _.isNumber(this.target) && (this.target = null);
};

GuidedBullet.prototype.lockOnTarget = function () {
  this.target && this.guidance.seek(this.pos, this.target.pos);
};

GuidedBullet.prototype.loseTarget = function () {
  if (!this.target) return;

  (this.target.remove || this.dist(this.target) > this.lockR) &&
      (this.target = null);
};

GuidedBullet.prototype.handleCollision = function (char) {
  Asteroids.Bullet.prototype.handleCollision.call(this, char);
  this.target = null;
};

GuidedBullet.prototype.draw = function (ctx) {
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
  } else if (this.displayTarg) {
      ctx.strokeStyle = 'red';
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.scanR, 0, 2 * Math.PI);
      ctx.stroke();
  }
};
})();
