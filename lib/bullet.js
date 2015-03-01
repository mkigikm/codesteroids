;(function () {
if (typeof window.Asteroids === "undefined") {
  window.Asteroids = {};
}

var Bullet = Asteroids.Bullet = function (keys) {
  Asteroids.MovingObject.call(this, _.extend(keys, Bullet.DEFAULTS));
};

Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

Bullet.prototype.isWrappable = function () {
  return false;
};

Bullet.prototype.move = function (targets) {
  var target;

  targets = targets || [];
  Asteroids.MovingObject.prototype.move.call(this);
  this.remove = Asteroids.Game.outOfBounds(this.pos);
  // scan for targets
  // console.log("scanning for targets")
  // console.log(targets[0].pos)
  // console.log("changing heading", targets[0].pos.addC(this.pos,-1).toString());
  // console.log("current heading", this.head.toString())
  // this.head.set(targets[0].pos.addC(this.pos,-1).norm())
  target = _.min(targets, function (target) {
    return target.pos.dist(this.pos)
  }.bind(this));
  console.log(target)
  !_.isNumber(target) && this.head.set(target.pos.addC(this.pos, - 1)).norm();
  // console.log(target)
};

Bullet.prototype.handleCollision = function (char) {
  if (this.remove) {
    return;
  }
  this.remove = true;
  char.handleCollision(this);
};
})();
