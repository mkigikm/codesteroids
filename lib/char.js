;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

var Char = Asteroids.Char = function (keys) {
  _.extend(keys, Asteroids.Char.DEFAULTS)
  keys.left  = keys.left  || null;
  keys.right = keys.right || null;

  Asteroids.MovingObject.call(this, keys);
};

Asteroids.Util.inherits(Asteroids.Char, Asteroids.MovingObject);

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
  var leftMost, rightMost;

  if (this.center) return this.center;

  leftMost  = this.findEnd("left");
  rightMost = this.findEnd("right");

  this.center = leftMost.pos.midPoint(rightMost.pos);
  this.setNeighborCenters(leftMost);

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

Char.prototype.setNeighborCenters = function (leftMost) {
  do {
    leftMost.center = this.center;

    this.center.x < 0 &&
        Asteroids.Game.wrapRight(leftMost.pos);
    this.center.x > Asteroids.Game.DIM_X &&
        Asteroids.Game.wrapLeft(leftMost.pos);
    this.center.y < 0 &&
        Asteroids.Game.wrapDown(leftMost.pos);
    this.center.y > Asteroids.Game.DIM_Y &&
        Asteroids.Game.wrapUp(leftMost.pos);
  } while (leftMost = leftMost.right);
};

Char.prototype.setKeys = function (keys, dir) {
  var key;

  for (key in keys) this[key] = keys[key];
  this[dir] && this[dir].setKeys(keys, dir);
};

Char.prototype.isWrappable = function () {
  return false;
};

Char.prototype.move = function () {
  this.wrapLine();
  Asteriods.MovingObject.move.call(this);
};
})();
