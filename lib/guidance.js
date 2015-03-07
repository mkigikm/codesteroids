;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

var Guidance = Asteroids.Guidance = function (limits, head, speed) {
  this.head   = head  || Asteroids.Vector.random();
  this.speed  = speed || 0;
  this.limits = limits;
};

Guidance.prototype.rotate = function (theta) {
  theta = Asteroids.Util.bringInRange(theta, this.limits.rotation);
  this.head.rot(theta);
};

Guidance.prototype.power = function (impulse) {
  impulse = Asteroids.Util.bringInRange(impulse, this.limits.impulse);
  if (Asteroids.Util.inRange(this.speed, this.limits.speed)) {
    this.speed =
        Asteroids.Util.bringInRange(this.speed + impulse, this.limits.speed);
  } else if ((this.speed > this.limits.speed.max && impulse < 0)
      || (this.speed < this.limits.speed.min && impulse > 0)) {
    this.speed += impulse;
  }
};

Guidance.prototype.setSpeed = function (speed) {
  this.power(speed - this.speed);
};

Guidance.prototype.drag = function () {
  this.speed *= 1 - this.limits.drag;
};

Guidance.prototype.vel = function () {
  return this.head.multC(this.speed);
};

Guidance.prototype.seek = function (pos, goal) {
  var angle = this.head.angle() - goal.subC(pos).angle();
  angle > Math.PI  && (angle -= 2 * Math.PI);
  angle < -Math.PI && (angle += 2 * Math.PI);

  this.rotate(angle);
};

Guidance.prototype.clone = function () {
  var clone      = new Guidance(this.limits);
  clone.head     = this.head.copy();
  clone.speed    = this.speed;
  return clone;
};
})();
