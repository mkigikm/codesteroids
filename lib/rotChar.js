;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

var RotChar = Asteroids.RotChar = function (pos, char) {
  Asteroids.Char.call(this, pos, char, RotChar.ATTRS);
  this.bulletTimer = new Asteroids.Util.Timer(0, 120);
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
  this.left  && this.left.resetLeader(this.left);
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
  this.bulletTimer.tick();
};

RotChar.prototype.pursueGoals = function (ship) {
  if (this.coordinator() && this.personality.state !== "stunned")
    this.personality.update.call(this, ship);
};

RotChar.prototype.sessile = function (ship) {
  if (this.alone()) {
    this.choosePersonality();
  } else {
    this.guidance.power(-Asteroids.Char.LIMITS.maxImpulse);
  }
};

RotChar.prototype.orbiter = function (ship) {
  var goalDist = this.guidance.center.dist(this.personality.goal);

  this.guidance.power();
  switch (this.personality.state) {
    case "seeking":
      if (goalDist > 100) {
        this.guidance.seek(this.pos, this.personality.goal);
      } else {
        this.personality.state = "orbiting";
      }
      break;
    case "orbiting":
      if (goalDist > 150) {
        this.personality.state = "seeking";
      } else {
        this.guidance.head.set(
          this.personality.goal.subC(this.guidance.center)
        );
        this.guidance.head.rot(Math.PI / 2).norm();
      }
      break;
  }
};

RotChar.prototype.sentinal = function (ship) {
  var goalDist = this.guidance.center.dist(this.personality.goal),
      shipDist = this.guidance.center.dist(ship.pos);

  this.guidance.power();
  switch (this.personality.state) {
    case "seeking":
      if (goalDist > 100) {
        this.guidance.seek(this.pos, this.personality.goal);
      } else {
        this.personality.state = "patrolling";
      }
      break;
    case "patrolling":
      if (goalDist > 300) {
        this.personality.state = "seeking";
      } else if (goalDist > 200) {
        this.guidance.head.rot(Math.PI).norm();
      }
      if (shipDist < 200) {
        this.personality.state = "attacking";
      }
      break;
    case "attacking":
      if (goalDist > 500 || shipDist > 500) {
        this.personality.state = "seeking";
      } else {
        this.guidance.seek(this.pos, ship.pos);
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

RotChar.prototype.draw = function (ctx) {
  Asteroids.Char.prototype.draw.call(this, ctx);
  if (!this.guidance || !this.guidance.center) return;
  if (this.coordinator() && this.personality.update === RotChar.prototype.orbiter) {
    ctx.fillStyle = 'purple';
    ctx.beginPath();
    ctx.arc(this.personality.goal.x, this.personality.goal.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fill();
    ctx.strokeStyle = 'purple';
    ctx.beginPath();
    ctx.arc(this.personality.goal.x, this.personality.goal.y, 100, 0, 2 * Math.PI);
    ctx.stroke();
  } else if (this.coordinator() && this.personality.update === RotChar.prototype.sentinal) {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(this.personality.goal.x, this.personality.goal.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    var r = {"seeking":0, "patrolling":200, "attacking": 500};
    r = r[this.personality.state]
    ctx.arc(this.guidance.center.x, this.guidance.center.y, r, 0, 2 * Math.PI);
    ctx.stroke();
  }
};

RotChar.prototype.fireShot = function (ship) {
  if (this.coordinator() && this.bulletTimer.off() && this.dist(ship) < 200 &&
      this.guidance.center) {
    this.bulletTimer.reset();
    return new Asteroids.ProjectileChar(this.guidance.center, ";", ship.pos);
  }
};
})();
