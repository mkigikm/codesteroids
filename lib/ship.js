(function () {
  if (typeof(window.Asteroids) === 'undefined') {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (keys) {
    keys.color = Ship.COLOR;
    keys.r     = Ship.RADIUS;
    keys.head  = new Asteroids.Vector({x: 0, y: -1});
    keys.speed = 0;

    this.bulletCooldown = 0;

    Asteroids.MovingObject.call(this, keys);
  };

  Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

  Ship.prototype.move = function (maxX, maxY) {
    Asteroids.MovingObject.prototype.move.call(this, maxX, maxY);
    this.bulletCooldown = Math.max(0, this.bulletCooldown - 1);
    this.invinsible     = Math.max(0, this.invinsible - 1);

    this.speed *= 1 - Ship.DRAG;
  };

  Ship.prototype.relocate = function (pos) {
    this.pos   = pos;
    this.speed = 0;
  };

  Ship.prototype.power = function (impulse) {
    this.speed = Math.min(impulse + this.speed, Ship.MAX_SPEED);
    this.speed = Math.max(this.speed, 0);
  };

  Ship.prototype.fireBullet = function () {
    if (!this.bulletCooldown && !this.invinsible) {
      this.bulletCooldown = Ship.BULLET_COOLDOWN;
      return new Asteroids.Bullet({head: this.head.copy(),
          pos: this.pos.copy()});
    }

    return null;
  };

  Ship.prototype.rotate = function (theta) {
    this.head.rot(theta);
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

    ctx.fillStyle = this.invinsible ? Ship.INV_COLOR : Ship.COLOR;
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
      this.invinsible = Ship.INV_COOLDOWN;
    }
  };
})();
