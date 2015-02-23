(function () {
  if (typeof(window.Asteroids) === 'undefined') {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (keys) {
    keys.color = Ship.COLOR;
    keys.r     = Ship.RADIUS;
    keys.vel   = [0, 0];

    Asteroids.MovingObject.call(this, keys);
  };

  Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

  Ship.COLOR  = "green";
  Ship.RADIUS = 5;
  Ship.MAX_SPEED = 8;

  Ship.prototype.relocate = function (pos) {
    this.pos = pos;
    this.vel = [0, 0];
  };

  Ship.prototype.power = function (impulse) {
    var newVel = Asteroids.Util.vecAdd(this.vel.slice(), impulse);

    if (Asteroids.Util.distance([0, 0], newVel) < Ship.MAX_SPEED) {
      this.vel = newVel;
    }
  };

  Ship.prototype.fireBullet = function () {
    var vel = Asteroids.Util.normVector(this.vel.slice());
    var bullet = new Asteroids.Bullet({vel: vel, pos: this.pos.slice()});

    return bullet;
  };

  Ship.prototype.rotate = function (theta) {
    Asteroids.Util.rotateVec(this.vel, theta);
  };
})();
