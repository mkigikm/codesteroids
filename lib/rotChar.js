;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

var RotChar = Asteroids.RotChar = function (keys) {
  Asteroids.Char.call(this, keys);
};

Asteroids.Util.inherits(Asteroids.RotChar, Asteroids.Char);

RotChar.prototype.rotate = function () {
  this.pos.add(this.center, -1).rot(RotChar.SPIN_ANGLE).add(this.center);
  this.center = null;
};

RotChar.prototype.handleCollision = function (bullet) {
  var u, v;
  if (this.left === this.right) {
    this.remove = true;
    return;
  }

  this.break("left", "right");
  this.break("right", "left");

  u = this.vel();
  v = bullet.vel();
  Asteroids.Vector.collide(this.pos, this.mass, u, bullet.pos, bullet.mass, v);

  this.speed   = u.mag();
  this.head    = u.norm();
  bullet.speed = v.mag();
  bullet.head  = v.norm();
};

RotChar.prototype.break = function (dir, opposite) {
  var newHead;

  if (!this[dir]) return;

  newHead = this[dir].pos.addC(this.pos, -1).norm();
  this[dir].setKeys({head: newHead}, dir);
  this[dir][opposite] = null;
  this[dir] = null;
};

RotChar.prototype.move = function () {
  this.wrapLine();
  this.rotate();
  Asteroids.MovingObject.prototype.move.call(this);
};
})();
