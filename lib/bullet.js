(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (keys) {
    keys.speed = Bullet.SPEED;
    keys.color = Bullet.COLOR;
    keys.r     = Bullet.RADIUS;

    Asteroids.MovingObject.call(this, keys);
    this.color = this.randomColor();
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.randomColor = function () {
    var hexChars = "0123456789ABCDEF";
    var color = "#", i;

    for (i = 0; i < 3; i++) {
      color += hexChars[16*Math.random()|0];
    }

    console.log(color)

    return color;
  };

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
