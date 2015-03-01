;(function () {
if (typeof window.Asteroids === "undefined") {
  window.Asteroids = {};
}

var Bullet = Asteroids.Bullet = function (keys) {
  Asteroids.MovingObject.call(this, _.extend(keys, Bullet.DEFAULTS));
//    this.color = this.randomColor();
};

Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

Bullet.prototype.randomColor = function () {
  var hexChars = "0123456789ABCDEF";
  var color = "#", i;

  for (i = 0; i < 3; i++) {
    color += hexChars[16*Math.random()|0];
  }

  return color;
};

Bullet.prototype.isWrappable = function () {
  return false;
};

Bullet.prototype.handleCollision = function (char) {
  if (this.remove) {
    return;
  }
  this.remove = true;
  char.handleCollision(this);
};
})();
