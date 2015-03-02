;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

var RotChar = Asteroids.RotChar = function (keys) {
  Asteroids.Char.call(this, keys);
  this.height = Asteroids.Game.DIM_Y * Math.random();
};

Asteroids.Util.inherits(Asteroids.RotChar, Asteroids.Char);

RotChar.prototype.rotate = function () {
  this.pos.sub(this.formation.center);
  this.pos.rot(RotChar.SPIN_ANGLE);
  this.pos.add(this.formation.center);
};

RotChar.prototype.handleCollision = function (bullet) {
  var u, v;
  if (this.left === this.right) {
    this.remove = true;
    return;
  }

  this.break("left", "right");
  this.break("right", "left");
  this.formation = null;

  u = this.vel();
  v = bullet.vel();
  Asteroids.Vector.collide(this.pos, this.mass, u, bullet.pos, bullet.mass, v);

  this.speed   = u.mag();
  this.head    = u.norm();
  bullet.speed = v.mag();
  bullet.head  = v.norm();
};

RotChar.prototype.break = function (dir, opposite) {
  console.log("breaking", dir, this.char)
  var newHead;

  if (!this[dir]) return;

  newHead = this[dir].pos.subC(this.pos).norm();
  this[dir].setKeys({head: newHead, formation: null}, dir);
  this[dir][opposite] = null;
  this[dir] = null;
};

RotChar.prototype.move = function (ship) {
  this.initFormation();
  this.pursueGoals(ship);
  this.rotate();
  Asteroids.MovingObject.prototype.move.call(this);
};

RotChar.prototype.pursueGoals = function (ship) {
  if (this.coordinator() && this.formation.state !== "stunned")
    this.formation.personality.update.call(this, ship);
};

RotChar.prototype.sessile = function (ship) {
  this.speed *= 0;
};

RotChar.prototype.orbiter = function (ship) {
  switch (this.personality.state) {
    case "seeking":
      if (this.guidance.center.dist(this.personality.goal) > 100) {
        this.head.set(this.personality.goal.subC(this.guidance.center)).norm();
        break;
      }
      this.formation.personality.state = "orbiting";
    case "orbiting":
      if (this.formation.center.dist(this.formation.goal) > 150) {
        this.formation.state = "seeking";
        break;
      }
      this.head.set(this.formation.goal.subC(this.formation.center));
      this.head.rot(Math.PI / 2).norm();
  }
};

RotChar.prototype.sentinal = function (ship) {
  switch (this.personality.state) {
    case "seeking":
      if (this.guidance.center.dist(this.personality.goal) > 10) {
        this.head.set(this.personality.goal.subC(this.guidance.center)).norm();
        break;
      }
      this.personality.state = "patrolling";
    case "patrolling":
      if (this.guidance.center.dist(this.personality.goal) > 300) {
        this.personality.state = "seeking";
        break;
      } else if (this.guidance.center.dist(this.personality.goal) > 200) {
        this.head.rot(Math.PI).norm();
      }
  }
}

RotChar.prototype.choosePersonality = function () {
  // this.head = Asteroids.Vector.zero();
  // return {update: RotChar.prototype.sessile, state: "attacking"};
  // return {update: RotChar.prototype.orbiter, state: "seeking"};
  this.personality = {
    update: RotChar.prototype.sentinal,
    state: "seeking",
    goal: Asteroids.Game.randomPos()
  };
};
})();
