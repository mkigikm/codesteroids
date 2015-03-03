;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

var RotChar = Asteroids.RotChar = function (pos, char) {
  Asteroids.Char.call(this, pos, char, RotChar.ATTRS);
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

  this.right && this.right.makeLeader();
  this.break("left", "right");
  this.break("right", "left");
  this.makeLeader();
  this.remove = true;

  // u = this.vel();
  // v = bullet.vel();
  // Asteroids.Vector.collide(this.pos, this.mass, u, bullet.pos, bullet.mass, v);
  //
  // this.speed   = u.mag();
  // this.head    = u.norm();
  // bullet.speed = v.mag();
  // bullet.head  = v.norm();
};

RotChar.prototype.break = function (dir, opposite) {
  if (!this[dir]) return;

  this[dir][opposite] = null;
  this[dir] = null;
};

RotChar.prototype.move = function (ship) {
  this.updateCenter();
  this.pursueGoals(ship);
  this.rotate();
  Asteroids.MovingObject.prototype.move.call(this);
};

RotChar.prototype.pursueGoals = function (ship) {
  if (this.coordinator() && this.personality.state !== "stunned")
    this.personality.update.call(this, ship);
};

RotChar.prototype.sessile = function (ship) {
  this.guidance.speed *= 0;
};

RotChar.prototype.orbiter = function (ship) {
  switch (this.personality.state) {
    case "seeking":
      if (this.guidance.center.dist(this.personality.goal) > 100) {
        this.guidance.seek(this.pos, this.personality.goal);
        break;
      }
      this.personality.state = "orbiting";
    case "orbiting":
      if (this.guidance.center.dist(this.personality.goal) > 150) {
        this.personality.state = "seeking";
        break;
      }
      this.guidance.head.set(this.personality.goal.subC(this.guidance.center));
      this.guidance.head.rot(Math.PI / 2).norm();
  }
};

RotChar.prototype.sentinal = function (ship) {
  switch (this.personality.state) {
    case "seeking":
      if (this.guidance.center.dist(this.personality.goal) > 100) {
        this.guidance.seek(this.pos, this.personality.goal);
        break;
      }
      this.personality.state = "patrolling";
    case "patrolling":
      if (this.guidance.center.dist(this.personality.goal) > 300) {
        this.personality.state = "seeking";
        break;
      } else if (this.guidance.center.dist(this.personality.goal) > 200) {
        this.guidance.head.rot(Math.PI).norm();
      }
  }
}

RotChar.prototype.choosePersonality = function () {
  var choice = Math.random();
  if (choice < 1/3) {
    this.personality = {
      update: RotChar.prototype.sessile,
      state: "attacking"
    };
  } else if (choice < 2/3) {
    this.personality = {
      update: RotChar.prototype.orbiter,
      state: "seeking",
      goal: Asteroids.Game.randomPos()
    };
  } else {
    this.personality = {
      update: RotChar.prototype.sentinal,
      state: "seeking",
      goal: Asteroids.Game.randomPos()
    };
  }
};
})();
