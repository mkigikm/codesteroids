;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

var MovingObject = Asteroids.MovingObject = function (pos, attrs) {
  var key;
  this.pos   = pos
  this.timer = 0;

  for (key in attrs) {
    this[key] = attrs[key];
  }
};

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos.add(this.guidance.vel());
  this.guidance.drag();
  this.guidance.dampen();
  this.timer++;
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  return this.pos.dist(otherObject.pos) < this.r + otherObject.r;
};

MovingObject.prototype.dist = function (pos) {
  pos instanceof MovingObject && (pos = pos.pos);
  return this.pos.dist(pos);
};

var Guidance = Asteroids.Guidance = function (limits, head, speed, external) {
  this.head     = head     || Asteroids.Vector.random();
  this.speed    = speed    || 0;
  this.external = external || Asteroids.Vector.zero();
  this.limits   = limits;
};

Guidance.prototype.rotate = function (theta) {
  var max = this.limits.maxRotate;
  theta = Math.abs(theta) > max ? Asteroids.Util.sign(theta) * max : theta;
  this.head.rot(theta);
};

Guidance.prototype.power = function (impulse) {
  var max = this.limits.maxImpulse;
  impulse = Math.abs(impulse) > max ?
      Asteroids.Util.sign(impulse) * max : impulse;
  this.speed += impulse;
  this.speed = Math.max(this.speed, this.limits.minSpeed);
  this.speed = Math.min(this.speed, this.limits.maxSpeed);
};

Guidance.prototype.setSpeed = function (speed) {
  this.power(speed - this.speed);
};

Guidance.prototype.dampen = function () {
  this.external.mult(1 - this.limits.dampen);
};

Guidance.prototype.drag = function () {
  this.speed *= 1 - this.limits.drag;
  this.speed = Math.min(this.speed, this.limits.maxSpeed);
};

Guidance.prototype.vel = function () {
  return this.head.multC(this.speed).add(this.external);
};

Guidance.prototype.seek = function (pos, goal) {
  var angle = this.head.angle() - goal.subC(pos).angle();
  if (Math.abs(angle) > Math.PI / 2) angle *= -1;
  this.rotate(angle);
};

Guidance.prototype.clone = function () {
  var clone      = new Guidance(this.limits);
  clone.head     = this.head.copy();
  clone.speed    = this.speed;
  clone.external = this.external.copy();
  return clone;
};
})();
