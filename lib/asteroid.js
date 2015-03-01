;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

var Asteroid = Asteroids.Asteroid = function (keys) {
  keys.color = Asteroids.Asteroid.COLOR;
  keys.r     = Asteroids.Asteroid.RADIUS;
  keys.left  = keys.left  || null;
  keys.right = keys.right || null;

  Asteroids.MovingObject.call(this, keys);
};

Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

Asteroid.prototype.startingHead = function() {
  return Asteroids.Vector.random();
};

Asteroid.newLine = function (start, orientation, word) {
  var formation = [], head = Asteroids.Vector.random(),
      pos = new Asteroids.Vector(start), i;

  if (orientation.x < 0) orientation.x *= -1;

  for (i = 0; i < word.length; i++) {
    formation.push(new Asteroid({pos: pos, head: head.copy(),
        speed: Asteroid.SPEED, char: word[i]}));

    if (i !== 0) {
      formation[i - 1].right = formation[i];
      formation[i].left      = formation[i - 1];
    }

    pos = pos.addC(orientation, Asteroid.LINE_SPACE);
  }

  return formation;
};

Asteroid.prototype.draw = function (ctx) {
  // Asteroids.MovingObject.prototype.draw.call(this, ctx);
  ctx.fillStyle = Asteroid.COLOR;
  ctx.font      = Asteroid.FONT;
  ctx.fillText(this.char, this.pos.x - 5, this.pos.y + 5);
};

Asteroid.prototype.rotate = function () {
  var mid      = this.findCenter();
  this.center = null;
  this.pos.add(mid, -1).rot(Asteroid.SPIN_ANGLE).add(mid);
};

Asteroid.prototype.findCenter = function () {
  var leftMost, rightMost;

  if (this.center) return this.center;

  leftMost  = this.findEnd("left");
  rightMost = this.findEnd("right");

  this.center = leftMost.pos.midPoint(rightMost.pos);
  this.setNeighborCenters(leftMost);

  Asteroids.Game.wrap(this.center);
  return this.center;
};

Asteroid.prototype.findEnd = function (key) {
  var end = this;

  while (end[key]) {
    end = end[key];
  };

  return end;
};

Asteroid.prototype.setNeighborCenters = function (leftMost) {
  while (leftMost) {
    leftMost.center = this.center;

    this.center.x < 0 &&
        Asteroids.Game.wrapRight(leftMost.pos);
    this.center.x > Asteroids.Game.DIM_X &&
        Asteroids.Game.wrapLeft(leftMost.pos);
    this.center.y < 0 &&
        Asteroids.Game.wrapDown(leftMost.pos);
    this.center.y > Asteroids.Game.DIM_Y &&
        Asteroids.Game.wrapUp(leftMost.pos);

    leftMost = leftMost.right;
  }
};

Asteroid.prototype.isWrappable = function () {
  return false;
};
})();
