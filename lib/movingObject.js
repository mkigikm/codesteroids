;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

var MovingObject = Asteroids.MovingObject = function (keys) {
  var key;

  for (key in keys) {
    this[key] = keys[key];
  }

  this.traveled = 0;
};

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;

  ctx.beginPath();
  ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos.add(this.head, this.speed);
  this.traveled += this.speed;
  if (this.speed > this.minSpeed) this.speed *= 1 - this.drag;

  if (this.isWrappable()) {
    Asteroids.Game.wrap(this.pos);
  }
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  return this.pos.dist(otherObject.pos) < this.r + otherObject.r;
};

MovingObject.prototype.isWrappable = function () {
  return true;
};

MovingObject.prototype.vel = function () {
  return this.head.multC(this.speed);
};

MovingObject.prototype.dist = function (obj) {
  return this.pos.dist(obj.pos);
};
})();
