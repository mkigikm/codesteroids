;(function () {
if (typeof window.Asteroids === "undefined") {
  window.Asteroids = {};
}

var Explosive = Asteroids.Explosive = function (ship) {
  Asteroids.MovingObject.call(this, ship.pos, Explosive.ATTRS);
  this.timer = new Asteroids.Util.Timer(this.time);
  this.guidance = new Asteroids.Guidance();
};

Asteroids.Util.inherits(Explosive, Asteroids.MovingObject);

Explosive.prototype.move = function () {
  this.timer.tick();
  this.r *= 1 + this.growth;
  this.remove = this.timer.off();
};

Explosive.prototype.handleCollision = function (char) {
  if (this.remove) {
    return;
  }
  char.handleCollision(this);
  // var forceVector = char.pos.addC(this.pos, -1).norm();
  // char.head.set(forceVector);
  // char.speed = 5;
};

Explosive.prototype.draw = function (ctx) {
  ctx.strokeStyle = this.color;

  ctx.beginPath();
  ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
  ctx.stroke();
};
})();
