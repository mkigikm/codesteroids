;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

var Char = Asteroids.Char = function (keys) {
  _.extend(keys, Asteroids.Char.DEFAULTS);
  keys.left  = keys.left  || null;
  keys.right = keys.right || null;

  Asteroids.MovingObject.call(this, keys);
  this.rotation = Math.PI / 500 * (1 + Math.random() * 4);
};

Asteroids.Util.inherits(Asteroids.Char, Asteroids.MovingObject);

Char.prototype.coordinator = function () {
  return this.left === null;
};

Char.newLine = function (pos, dir, word, head, Type, keys) {
  var formation = [], i, char;

  if (dir.x < 0) dir.x *= -1;

  for (i = 0; i < word.length; i++) {
    char = new Type(_.extend({pos: pos, head: head, char: word[i]}, keys));
    formation.push(char);

    if (i !== 0) {
      formation[i - 1].right = formation[i];
      formation[i].left      = formation[i - 1];
    }

    pos = pos.addC(dir, Char.LINE_SPACE * formation[i].r);
  }

  return formation;
};

Char.prototype.draw = function (ctx) {
  // Asteroids.MovingObject.prototype.draw.call(this, ctx);
  ctx.fillStyle = this.color;
  ctx.font      = this.font;
  ctx.fillText(this.char, this.pos.x - 5, this.pos.y + 5);
};

Char.prototype.wrapLine = function () {
  var rightMost;

  if (!this.coordinator()) return;

  rightMost = this.findEnd("right");
  this.center = this.pos.midPoint(rightMost.pos);
  this.setNeighborCenters();

  Asteroids.Game.wrap(this.center);
  return this.center;
};

Char.prototype.findEnd = function (key) {
  var end = this;

  while (end[key]) {
    end = end[key];
  };

  return end;
};

Char.prototype.setNeighborCenters = function () {
  this.center.x < 0                    && Asteroids.Game.wrapRight(this.pos);
  this.center.x > Asteroids.Game.DIM_X && Asteroids.Game.wrapLeft(this.pos);
  this.center.y < 0                    && Asteroids.Game.wrapDown(this.pos);
  this.center.y > Asteroids.Game.DIM_Y && Asteroids.Game.wrapUp(this.pos);

  if (this.right !== null) {
    this.right.center = this.center;
    this.right.setNeighborCenters();
  }
};

Char.prototype.setKeys = function (keys, dir) {
  var key;

  for (key in keys) this[key] = keys[key];
  this[dir] && this[dir].setKeys(keys, dir);
};

Char.prototype.isWrappable = function () {
  return false;
};

Char.prototype.changeDirection = function (ship) {
  if (!this.coordinator()) return;

  // this.head.set(ship.pos.subC(this.center).norm());
  // if (this.center.dist(ship.pos) < 250) {
  //   this.head.rot(Math.PI / 2);
  // }
  var ideal = this.idealPos();
  if (this.center.dist(ideal) > 100) {
    this.head.set(this.idealPos().sub(this.center).norm());
  }
};

Char.prototype.move = function () {
  this.wrapLine();
  Asteriods.MovingObject.move.call(this);
};
})();
