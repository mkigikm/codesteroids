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

  // u = this.vel();
  // v = bullet.vel();
  // Asteroids.Vector.collide(this.pos, this.mass, u, bullet.pos, bullet.mass, v);
  //
  // this.speed   = u.mag();
  // this.head    = u.norm();
  // bullet.speed = v.mag();
  // bullet.head  = v.norm();
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
  if (choice < .25) {
    this.personality = Asteroids.AI.Sessile.update;
    console.log("another sessile", this.char, this.alone());
  } else if (choice < .625) {
    this.personality = Asteroids.AI.Orbiter.update;
    console.log("another orbiter");
  } else {
    this.personality = Asteroids.AI.Sentinal.update;
    console.log("another sentinal");
  }
};

// RotChar.prototype.draw = function (ctx) {
//   Asteroids.Char.prototype.draw.call(this, ctx);
//   if (!this.guidance || !this.guidance.center) return;
//   if (this.coordinator() && this.personality.update === RotChar.prototype.orbiter) {
//     ctx.fillStyle = 'purple';
//     ctx.beginPath();
//     ctx.arc(this.personality.goal.x, this.personality.goal.y, this.r, 0, 2 * Math.PI);
//     ctx.fill();
//     ctx.fill();
//     ctx.strokeStyle = 'purple';
//     ctx.beginPath();
//     ctx.arc(this.personality.goal.x, this.personality.goal.y, 100, 0, 2 * Math.PI);
//     ctx.stroke();
//   } else if (this.coordinator() && this.personality.update === RotChar.prototype.sentinal) {
//     ctx.fillStyle = 'blue';
//     ctx.beginPath();
//     ctx.arc(this.personality.goal.x, this.personality.goal.y, this.r, 0, 2 * Math.PI);
//     ctx.fill();
//     ctx.strokeStyle = 'blue';
//     ctx.beginPath();
//     var r = {"seeking":0, "patrolling":200, "attacking": 500};
//     r = r[this.personality.state]
//     ctx.arc(this.guidance.center.x, this.guidance.center.y, r, 0, 2 * Math.PI);
//     ctx.stroke();
//   }
// };

RotChar.prototype.fireShot = function (ship) {
  if (this.coordinator() && this.bulletTimer.off() && this.dist(ship) < 200 &&
      this.guidance.center) {
    this.bulletTimer.reset();
    return new Asteroids.ProjectileChar(this.guidance.center, ";", ship.pos);
  }
};
})();
