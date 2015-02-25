(function () {
  if (typeof(window.Asteroids) === 'undefined') {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (keys) {
    keys.color = Ship.COLOR;
    keys.r     = Ship.RADIUS;
    keys.head  = [0, -1];
    keys.speed = 0;

    this.bulletCooldown = 0;

    Asteroids.MovingObject.call(this, keys);
  };

  Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

  Ship.prototype.move = function (maxX, maxY) {
    Asteroids.MovingObject.prototype.move.call(this, maxX, maxY);
    this.bulletCooldown = Math.max(0, this.bulletCooldown - 1);
    this.invinsible     = Math.max(0, this.invinsible - 1);
    // this.speed          = Math.max(0, this.speed - Ship.DECEL)
    this.speed *= 1-Ship.DECEL;
  };

  Ship.prototype.relocate = function (pos) {
    this.pos   = pos;
    this.speed = 0;
  };

  Ship.prototype.power = function (impulse) {
    this.speed = Math.min(impulse+this.speed, Ship.MAX_SPEED);
    this.speed = Math.max(this.speed, 0);
  };

  Ship.prototype.fireBullet = function () {
    if (!this.bulletCooldown && !this.invinsible) {
      this.bulletCooldown = Ship.BULLET_COOLDOWN;
      return new Asteroids.Bullet({head: this.head.slice(),
          pos: this.pos.slice()});
    }

    return null;
  };

  Ship.prototype.rotate = function (theta) {
    Asteroids.Util.vecRot(this.head, theta);
  };

  Ship.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.beginPath();

    ctx.moveTo.apply(ctx, this.top());
    ctx.lineTo.apply(ctx, this.right());
    ctx.lineTo(0, 0);
    ctx.lineTo.apply(ctx, this.left());
    ctx.moveTo.apply(ctx, this.top());

    ctx.fillStyle = this.invinsible ? Ship.INV_COLOR : Ship.COLOR;
    ctx.fill();
    ctx.restore();
  };

  Ship.prototype.top = function () {
    return Asteroids.Util.vecMult(this.r, this.head.slice());
  };

  Ship.prototype.right = function () {
    return Asteroids.Util.vecRot(this.top(), 120 * 2 * Math.PI / 180);
  };

  Ship.prototype.left = function () {
    return Asteroids.Util.vecRot(this.top(), -120 * 2 * Math.PI / 180);
  };

  Ship.prototype.handleCollision = function (asteroid) {
    if (!this.invinsible) {
      this.pos        = Asteroids.Game.randomPos();
      this.invinsible = Ship.INV_COOLDOWN;
    }
  };
})();
