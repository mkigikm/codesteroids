(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (keys) {
    keys.speed = Bullet.SPEED;
    keys.color = Bullet.COLOR;
    keys.r     = Bullet.RADIUS;

    Asteroids.MovingObject.call(this, keys);
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.isWrappable = function () {
    return false;
  };

  Bullet.prototype.handleCollision = function (asteroid) {
    var cur = asteroid, angle = 2 * Math.PI * Math.random();

    if (this.remove) {
      return;
    }

    asteroid.remove = true;
    this.remove     = true;

    while ((cur = cur.left) !== null) {
      Asteroids.Util.vecRot(cur.head, angle);
    }

    cur = asteroid;
    while ((cur = cur.right) != null) {
      Asteroids.Util.vecRot(cur.head, -angle);
    }

    asteroid.left  && (asteroid.left.right = null);
    asteroid.right && (asteroid.right.left = null);
  };
})();
