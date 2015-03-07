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
  ctx.stroke();
};

MovingObject.prototype.move = function () {
  this.pos.add(this.guidance.vel());
  this.guidance.drag();
  this.timer++;
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  return this.pos.dist(otherObject.pos) < this.r + otherObject.r;
};

MovingObject.prototype.dist = function (pos) {
  pos instanceof MovingObject && (pos = pos.pos);
  return this.pos.dist(pos);
};
})();
