(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (keys) {
    keys.vel[0] *= Bullet.SPEED;
    keys.vel[1] *= Bullet.SPEED;

    keys.color = Bullet.COLOR;
    keys.r     = Bullet.RADIUS;
    Asteroids.MovingObject.call(this, keys);
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.COLOR  = 'black';
  Bullet.RADIUS = 5;
  Bullet.SPEED  = 6;

  Bullet.prototype.isWrappable = function () {
    return false;
  };
})();
