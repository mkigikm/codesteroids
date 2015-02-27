(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (keys) {
    keys.speed = Bullet.SPEED;
    keys.color = Bullet.COLOR;
    keys.r     = Bullet.RADIUS;

    Asteroids.MovingObject.call(this, keys);
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

  Bullet.prototype.handleCollision = function (asteroid) {
    var cur = asteroid, angle = 2 * Math.PI * Math.random(), v0, v1;

    if (this.remove) {
      return;
    }

    asteroid.remove = true;
    this.remove     = true;

    while ((cur = cur.left) !== null) {
      cur.head.rot(angle);
    }

    cur = asteroid;
    while ((cur = cur.right) != null) {
      cur.head.rot(-angle);
    }

    asteroid.left  && (asteroid.left.right = null);
    asteroid.right && (asteroid.right.left = null);
    asteroid.left  = null;
    asteroid.right = null;

    v0 = this.vel();
    v1 = asteroid.vel();
    Asteroids.Vector.collide(this.pos, asteroid.pos, v0, v1);

    this.speed     = v0.mag();
    this.head      = v0.norm();
    asteroid.speed = v1.mag();
    asteroid.head  = v1.norm();
  };
})();
