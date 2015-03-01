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

Bullet.prototype.move = function (targets) {
  var target;

  targets = targets || [];
  Asteroids.MovingObject.prototype.move.call(this);
  this.remove = this.traveled > this.maxDistance;
  // scan for targets
  // console.log("scanning for targets")
  // console.log(targets[0].pos)
  // console.log("changing heading", targets[0].pos.addC(this.pos,-1).toString());
  // console.log("current heading", this.head.toString())
  // this.head.set(targets[0].pos.addC(this.pos,-1).norm())
  this.findTarget(targets);
  this.lockOnTarget();
  // console.log(target)
};

Bullet.prototype.findTarget = function (targets) {
  // if the target has been destroyed or is too far away, seek a new target
  this.loseTarget();
  // return if we already have a target or there are no targets left
  if (this.target || targets.length === 0) return;

  targets = _.filter(targets, function (target) {
    return target.dist(this) < 100;
  }, this);

  this.target = _.min(targets, function (target) {
    return target.dist(this);
  }, this);

  _.isNumber(this.target) && (this.target = null);
};

Bullet.prototype.lockOnTarget = function () {
  var angle, targetAngle, sign;

  if (!this.target) return;
  angle = this.head.angle() - this.target.pos.addC(this.pos, -1).angle();
  sign = angle > 0 ? 1: -1;
  angle = sign * Math.min(Math.PI / 20, Math.abs(angle));
  // console.log("my angle", myAngle * 180 / Math.PI, this.head.toString())
  // console.log("angle to target", targetAngle * 180 / Math.PI)
  // console.log("rotation angle", (myAngle - targetAngle) * 180 / Math.PI)
  // var newHead = this.head.rotC(targetAngle - myAngle)
  // console.log(newHead.toString())
  this.head.rot(angle);
};

Bullet.prototype.loseTarget = function () {
  if (!this.target) return;

  (this.target.remove || this.target.dist(this) > 100) && (this.target = null);
};

Bullet.prototype.handleCollision = function (char) {
  if (this.remove) {
    return;
  }
  this.remove = true;
  char.handleCollision(this);
};

Bullet.prototype.draw = function (ctx) {
  Asteroids.MovingObject.prototype.draw.call(this, ctx);

  ctx.strokeStyle = 'red';
  ctx.beginPath();
  ctx.arc(this.pos.x, this.pos.y, 100, 0, 2 * Math.PI);
  ctx.stroke();

  if (this.target) {
    ctx.strokeStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(this.target.pos.x, this.target.pos.y, 10, 0, 2 * Math.PI);
    ctx.stroke();
  }
};
})();
