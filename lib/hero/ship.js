;(function () {
if (typeof(window.Asteroids) === 'undefined') {
  window.Asteroids = {};
}

var Ship = Asteroids.Ship = function (pos) {
  Asteroids.MovingObject.call(this, pos, Ship.ATTRS);

  this.guidance = new Asteroids.Guidance(
    Ship.LIMITS, new Asteroids.Vector({x:0, y:-1})
  );

  this.invinsibleTimer = new Asteroids.Util.Timer(0, this.invCooldown);
  this.bulletTimer     = new Asteroids.Util.Timer(0, this.bulletCooldown);
  this.tenCountTimer   = new Asteroids.Util.Timer(this.tenCountMax);
  this.partyTimer      = new Asteroids.Util.Timer(0, this.partyTimeout);

  this.health = new Asteroids.Util.Timer(this.startHealth, this.maxHealth);
  this.guided = new Asteroids.Util.Timer(0, this.maxGuided);
  this.spread = new Asteroids.Util.Timer(0, this.maxSpread);
};

Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

Ship.prototype.move = function () {
  this.health.off() ? this.moveDeath() : this.moveShip();
};

Ship.prototype.moveDeath = function () {
  this.deathParticles.forEach(function (particle) {
    particle.move();
  });
};

Ship.prototype.moveShip = function () {
  var dir = 1;
  Asteroids.MovingObject.prototype.move.call(this);
  this.bulletTimer.tick();
  this.invinsibleTimer.tick();
  this.partyTimer.tick();

  if (Asteroids.Game.outOfBounds(this.pos)) {
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.guidance.head.y > 0 && (dir = -1);
    }
    if (this.pos.x > Asteroids.Game.DIM_X) {
      this.pos.x = Asteroids.Game.DIM_X;
      this.guidance.head.y < 0 && (dir = -1);
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.guidance.head.x < 0 && (dir = -1);
    }
    if (this.pos.y > Asteroids.Game.DIM_Y) {
      this.pos.y = Asteroids.Game.DIM_Y;
      this.guidance.head.x > 0 && (dir = -1);
    }
    this.guidance.head.rot(dir * Math.PI / 2);
    this.guidance.speed /= 2;
  }
};

Ship.prototype.relocate = function (pos) {
  this.pos            = pos;
  this.guidance.speed = 0;
};

Ship.prototype.power = function (impulse) {
  this.guidance.power(impulse);
};

Ship.prototype.accelerate = function () {
  this.power(this.accel);
};

Ship.prototype.decelerate = function () {
  this.power(this.decel);
};

Ship.prototype.fireGuidedBullet = function () {
  if (this.bulletTimer.off() && this.invinsibleTimer.off()) {
    this.bulletTimer.reset();
    return new Asteroids.GuidedBullet(
      this,
      Asteroids.GuidedBullet.LIMITS[this.guided.value],
      this.partyTimer.on()
    );
  }

  return null;
};

Ship.prototype.fireSpreadBullets = function () {
  if (this.bulletTimer.off() && this.invinsibleTimer.off()) {
    this.bulletTimer.reset();
    return _.map(
      Ship.SPREAD[this.spread.value],
      function (rotate) {
        return new Asteroids.Bullet(this, rotate, this.partyTimer.on());
      }, this
    );
  }

  return [];
};

Ship.prototype.fireExplosive = function () {
  return new Asteroids.Explosive(this);
};

Ship.prototype.rotate = function (dir) {
  this.guidance.rotate(dir * Math.PI * 2);
};

Ship.prototype.draw = function (ctx) {
  this.health.off() ? this.drawDeath(ctx) : this.drawShip(ctx);
};

Ship.prototype.drawDeath = function (ctx) {
  this.deathParticles.forEach(function (particle) {
    particle.draw(ctx);
  });
};

Ship.prototype.drawShip = function (ctx) {
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

  ctx.fillStyle = this.invinsibleTimer.on() ? this.invColor : this.color;
  ctx.fill();
  ctx.restore();
};

Ship.prototype.topVertex = function () {
  return this.guidance.head.multC(this.r);
};

Ship.prototype.rightVertex = function () {
  return this.topVertex().rot(120 * 2 * Math.PI / 180);
};

Ship.prototype.leftVertex = function () {
  return this.topVertex().rot(-120 * 2 * Math.PI / 180);
};

Ship.prototype.handleCollision = function (asteroid) {
  this.takeDamage(1);
  asteroid.hitShip();
};

Ship.prototype.takeDamage = function (damage) {
  if (this.invinsibleTimer.on()) return;

  this.invinsibleTimer.reset();
  this.health.tick(damage);
  if (this.health.off()) {
    this.deathParticles = [];
    _.times(200, function () {
      this.deathParticles.push(new Asteroids.DeathParticle(this.pos));
    }, this);
  }
};

["health", "guided", "spread"].forEach(function (attr) {
  var capAttr = attr.charAt(0).toUpperCase() + attr.slice(1);
  Ship.prototype["level" + capAttr] = function () {
    this[attr].tock();
  }
});

Ship.prototype.partyTime = function () {
  this.partyTimer.reset();
};
})();
