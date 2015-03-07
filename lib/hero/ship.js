;(function () {
if (typeof(window.Asteroids) === 'undefined') {
  window.Asteroids = {};
}

var Ship = Asteroids.Ship = function (pos) {
  Asteroids.MovingObject.call(this, pos, Ship.ATTRS);

  this.guidance = new Asteroids.Guidance(
    Ship.LIMITS, new Asteroids.Vector({x:0, y:-1})
  );

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
  this.pos            = pos;
  this.guidance.speed = 0;
};

Ship.prototype.power = function (impulse) {
  this.guidance.power(impulse);
};

Ship.prototype.accelerate = function () {
  this.power(this.accel);
};

Ship.prototype.decelerate = function () {
  this.power(this.decel);
};

Ship.prototype.fireGuidedBullet = function () {
  if (this.bulletTimer.off() && this.invinsibleTimer.off()) {
    this.bulletTimer.reset();
    return new Asteroids.GuidedBullet(this);
  }

  return null;
};

Ship.prototype.fireSpreadBullets = function () {
  if (this.bulletTimer.off() && this.invinsibleTimer.off()) {
    this.bulletTimer.reset();
    return _.map(
      Ship.SPREAD[this.spreadLevel],
      function (rotate) { return new Asteroids.Bullet(this, rotate); },
      this
    );
  }

  return [];
};

Ship.prototype.fireExplosive = function () {
  return new Asteroids.Explosive(this);
};

Ship.prototype.rotate = function (dir) {
  this.guidance.rotate(dir * Math.PI * 2);
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
  return this.guidance.head.multC(this.r);
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
