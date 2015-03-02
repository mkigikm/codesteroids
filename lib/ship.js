;(function () {
if (typeof(window.Asteroids) === 'undefined') {
  window.Asteroids = {};
}

var Ship = Asteroids.Ship = function (keys) {
  _.extend(keys, Asteroids.Ship.DEFAULTS);
  keys.head           = new Asteroids.Vector({x: 0, y: -1});
  keys.speed          = 0;

  Asteroids.MovingObject.call(this, keys);
  this.invinsibleTimer = new Asteroids.Util.Timer(0, this.invCooldown);
  this.bulletTimer     = new Asteroids.Util.Timer(0, this.bulletCooldown);
};

Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

Ship.prototype.move = function () {
  Asteroids.MovingObject.prototype.move.call(this);
  this.bulletTimer.tick();
  this.invinsibleTimer.tick();
};

Ship.prototype.relocate = function (pos) {
  this.pos   = pos;
  this.speed = 0;
};

Ship.prototype.power = function (impulse) {
  this.guidance.power(impulse, 0, this.maxSpeed);
};

Ship.prototype.accelerate = function () {
  this.power(this.accel);
};

Ship.prototype.decelerate = function () {
  this.power(this.decel);
};

Ship.prototype.fireBullet = function () {
  if (this.bulletTimer.off() && this.invinsibleTimer.off()) {
    this.bulletTimer.reset();
    return new Asteroids.Bullet({head: this.head.copy(),
        pos: this.pos.copy()});
  }

  return null;
};

Ship.prototype.fireExplosive = function () {
  return new Asteroids.Explosive({pos: this.pos});
};

Ship.prototype.rotate = function (dir) {
  this.guidance.rot(dir * this.rotation);
};

Ship.prototype.draw = function (ctx) {
  var top   = this.topVertex(),
      right = this.rightVertex(),
      left  = this.leftVertex();

  ctx.save();
  ctx.translate(this.pos.x, this.pos.y);
  ctx.beginPath();

  ctx.moveTo(top.x, top.y);
  ctx.lineTo(right.x, right.y);
  ctx.lineTo(0, 0);
  ctx.lineTo(left.x, left.y);
  ctx.moveTo(top.x, top.y);

  ctx.fillStyle = this.invinsibleTimer.on() ? this.invColor : this.color;
  ctx.fill();
  ctx.restore();
};

Ship.prototype.topVertex = function () {
  return this.head.multC(this.r);
};

Ship.prototype.rightVertex = function () {
  return this.topVertex().rot(120 * 2 * Math.PI / 180);
};

Ship.prototype.leftVertex = function () {
  return this.topVertex().rot(-120 * 2 * Math.PI / 180);
};

Ship.prototype.handleCollision = function (asteroid) {
  if (this.invinsibleTimer.off()) {
    this.pos = Asteroids.Game.randomPos();
    this.invinsibleTimer.reset();
  }
};
})();
