;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

var Char = Asteroids.Char = function (pos, char, attrs) {
  Asteroids.MovingObject.call(this, pos, attrs);
  this.char = char;
  this.left = this.right = null;
};

Asteroids.Util.inherits(Asteroids.Char, Asteroids.MovingObject);

Char.prototype.coordinator = function () {
  return this.left === null;
};

Char.newLine = function (pos, word, Type) {
  var formation = [], i, char;

  for (i = 0; i < word.length; i++) {
    char = new Type(pos, word[i]);
    formation.push(char);

    if (i !== 0) {
      formation[i - 1].right = formation[i];
      formation[i].left      = formation[i - 1];
    }

    pos = pos.addC({x:1, y:0}, Char.LINE_SPACE * formation[i].r);
  }

  formation[0].makeLeader();
  return formation;
};

Char.prototype.draw = function (ctx) {
  // Asteroids.MovingObject.prototype.draw.call(this, ctx);
  ctx.fillStyle = this.color;
  ctx.font      = this.font;
  ctx.fillText(this.char, this.pos.x - 5, this.pos.y + 5);
};

Char.prototype.makeLeader = function () {
  this.choosePersonality();
  this.guidance = this.guidance ? this.guidance.clone() :
      new Asteroids.Guidance(Char.LIMITS, null, this.speed);
  this.end = this.initNeighbors();
};

Char.prototype.resetLeader = function (end) {
  if (this.left) return this.left.resetLeader(end);

  this.end = end;
  this.alone() && this.choosePersonality();
};

Char.prototype.updateCenter = function () {
  if (this.coordinator()) {
    this.guidance.center = this.pos.midPoint(this.end.pos);
  }
}

Char.prototype.initNeighbors = function () {
  if (this.right) {
    this.right.guidance    = this.guidance;
    this.right.personality = this.personality;
    return this.right.initNeighbors();
  }
  return this;
};

Char.prototype.alone = function () {
  return this.left === this.right;
};

Char.prototype.fireShot = function () {
  return null;
};

Char.prototype.drop = function () {
};

Char.prototype.hitShip = function () {
};
})();
