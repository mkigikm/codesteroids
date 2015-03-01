;(function () {
if (typeof(window.Asteroids) === 'undefined') {
  window.Asteroids = {};
}

var Ship = Asteroids.Ship = function (keys) {
  _.extend(keys, Asteroids.Ship.DEFAULTS);
  keys.head           = new Asteroids.Vector({x: 0, y: -1});
  keys.speed          = 0;
  keys.bulletCooldown = 0;
  keys.invinsible     = 0;

  Asteroids.MovingObject.call(this, keys);
};

Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

Ship.prototype.move = function () {
  // console.log(this.speed, this.head.toString(), this.pos.toString())
  Asteroids.MovingObject.prototype.move.call(this);
  this.bulletCooldown = Math.max(0, this.bulletCooldown - 1);
  this.invinsible     = Math.max(0, this.invinsible - 1);
};

Ship.prototype.relocate = function (pos) {
  this.pos   = pos;
  this.speed = 0;
};

Ship.prototype.power = function (impulse) {
  this.speed = Math.min(impulse + this.speed, this.maxSpeed);
  this.speed = Math.max(this.speed, 0);
};

Ship.prototype.accelerate = function () {
  this.power(this.accel);
};

Ship.prototype.decelerate = function () {
  this.power(this.decel);
};

Ship.prototype.fireBullet = function () {
  if (!this.bulletCooldown && !this.invinsible) {
    this.bulletCooldown = this.maxBulletCooldown;
    return new Asteroids.Bullet({head: this.head.copy(),
        pos: this.pos.copy()});
  }

  return null;
};

Ship.prototype.rotate = function (dir) {
  this.head.rot(dir * this.rotation);
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

  ctx.fillStyle = this.invinsible ? this.invColor : this.color;
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
  if (!this.invinsible) {
    this.pos        = Asteroids.Game.randomPos();
    this.invinsible = this.maxInvCooldown;
  }
};
})();
