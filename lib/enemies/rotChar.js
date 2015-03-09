;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

var RotChar = Asteroids.RotChar = function (pos, char) {
  Asteroids.Char.call(this, pos, char, RotChar.ATTRS);
  this.bulletTimer = new Asteroids.Util.Timer(0, 150);
};

Asteroids.Util.inherits(Asteroids.RotChar, Asteroids.Char);

RotChar.prototype.rotate = function () {
  this.pos.sub(this.guidance.center);
  this.pos.rot(this.spinAngle);
  this.pos.add(this.guidance.center);
};

RotChar.prototype.handleCollision = function (bullet) {
  var u, v;
  if (this.left === this.right) {
    this.remove = true;
    return;
  }

  this.breakLeft();
  this.breakRight();
  this.makeLeader();
  this.remove = true;
};

RotChar.prototype.breakLeft = function () {
  if (!this.left) return;

  this.left.right = null;
  this.left.resetLeader(this.left);
  this.left = null;
};

RotChar.prototype.breakRight = function () {
  if (!this.right) return;

  this.right.left = null;
  this.right.makeLeader();
  this.right = null;
};

RotChar.prototype.move = function (ship) {
  this.updateCenter();
  this.pursueGoals(ship);
  this.rotate();
  Asteroids.MovingObject.prototype.move.call(this);
  this.bulletTimer.tick();
};

RotChar.prototype.pursueGoals = function (ship) {
  if (this.coordinator())
    this.state = this.personality(
      this.state,
      this.guidance.center,
      this.goal,
      this.guidance,
      ship.pos
    );
};

RotChar.prototype.choosePersonality = function () {
  var choice;
  this.goal = new Asteroids.Vector.zero();
  this.state = "choosing";

  if (this.alone()) {
    this.personality = Asteroids.AI.Wanderer.update;
    return;
  }

  choice = Math.random();
  if (choice < .5) {
    this.personality = Asteroids.AI.Orbiter.update;
  } else {
    this.personality = Asteroids.AI.Sentinal.update;
  }
};

RotChar.prototype.fireShot = function (ship) {
  if (this.coordinator() && this.bulletTimer.off() && this.dist(ship) < 200 &&
      this.guidance.center) {
    this.bulletTimer.reset();
    return new Asteroids.ProjectileChar(this.guidance.center, ";", ship.pos);
  }
};

RotChar.prototype.drop = function () {
  var choice;

  if (!this.remove) return;

  choice = Math.random();
  if (choice < 0.1) return new Asteroids.Health(this.pos);
  else if (choice < 0.2) return new Asteroids.Guided(this.pos);
  else if (choice < 0.3) return new Asteroids.Spread(this.pos);
  else if (choice < 0.32) return new Asteroids.PartyHat(this.pos);
};
})();
