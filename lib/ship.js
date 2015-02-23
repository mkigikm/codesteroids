(function () {
  if (typeof(window.Asteroids) === 'undefined') {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (keys) {
    keys.color = Ship.COLOR;
    keys.r     = Ship.RADIUS;
    keys.head  = [1, 0];
    keys.speed = 0;
    this.givePowerUp = false;

    Asteroids.MovingObject.call(this, keys);
  };

  Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

  Ship.COLOR  = "green";
  Ship.RADIUS = 5;
  Ship.MAX_SPEED = 8;

  Ship.prototype.relocate = function (pos) {
    this.pos = pos;
    this.speed = 0;
  };

  Ship.prototype.power = function (impulse) {
    this.speed = Math.min(impulse+this.speed, Ship.MAX_SPEED);
    this.speed = Math.max(this.speed, 0);
  };

  Ship.prototype.fireBullet = function () {
    return new Asteroids.Bullet({head: this.head.slice(),
        pos: this.pos.slice(), poweredUp: this.givePowerUp});
  };

  Ship.prototype.rotate = function (theta) {
    Asteroids.Util.rotateVec(this.head, theta);
  };
})();
