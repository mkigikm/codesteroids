;(function () {
if (typeof window.Asteroids === "undefined") {
  window.Asteroids = {};
}

var Explosive = Asteroids.Explosive = function (keys) {
  Asteroids.MovingObject.call(this, _.extend(keys, Explosive.DEFAULTS));
  this.timer = new Asteroids.Util.Timer(this.time);
  this.head = new Asteroids.Vector.zero();
};

Asteroids.Util.inherits(Explosive, Asteroids.MovingObject);

Explosive.prototype.move = function () {
  console.log("growing", this.pos.toString(), this.r)
  this.timer.tick();
  this.r *= 1 + this.growth;
  this.remove = this.timer.off();
};

Explosive.prototype.handleCollision = function (char) {
  if (this.remove) {
    return;
  }
  char.handleCollision(this);
  var forceVector = char.pos.addC(this.pos, -1).norm();
  char.head.set(forceVector);
  char.speed = 5;
};

Explosive.prototype.draw = function (ctx) {
  ctx.strokeStyle = this.color;

  ctx.beginPath();
  ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
  ctx.stroke();
};
})();
