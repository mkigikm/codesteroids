;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

var MovingObject = Asteroids.MovingObject = function (keys) {
  var key;

  for (key in keys) {
    this[key] = keys[key];
  }

  this.timer = 0;
  this.guidance = new Guidance(this.head, this.speed);
};

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;

  ctx.beginPath();
  ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos.add(this.guidance.vel());
  this.guidance.drag(this.drag);
  this.guidance.dampen(this.damp);
  this.timer++;
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  return this.pos.dist(otherObject.pos) < this.r + otherObject.r;
};

MovingObject.prototype.vel = function () {
  return this.head.multC(this.speed);
};

MovingObject.prototype.dist = function (pos) {
  return this.pos.dist(pos);
};

var Guidance = Asteroids.Guidance = function (head, speed, external) {
  this.head     = head;
  this.speed    = speed;
  this.external = external || Asteroids.Vector.zero();
};

Guidance.prototype.rotate = function (theta, max) {
  theta = Math.abs(theta) > max ? Asteroids.Util.sign(theta) * max : theta;
  this.head.rot(theta);
};

Guidance.prototype.power = function (impulse, min, max) {
  this.speed += impulse;
  this.speed = Math.max(this.speed, min);
  this.speed = Math.min(this.speed, max);
};

Guidance.prototype.dampen = function (factor) {
  this.external.mult(1 - factor);
};

Guidance.prototype.drag = function (factor) {
  this.speed *= 1 - this.drag;
};

Guidance.prototype.vel = function () {
  return this.head.multC(this.speed).add(this.external);
};
})();
