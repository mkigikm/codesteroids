;(function () {
if (typeof(window.Asteroids) === 'undefined') {
  window.Asteroids = {};
}

var Game = Asteroids.Game = function () {
  this.chars   = [];
  this.bullets = [];
  this.ship    = new Asteroids.Ship({pos: Game.randomPos()});

  this.addChars(Game.NUM_LINES);
  this.addAttacker();
};

Asteroids.Game.prototype.addChars = function (toAdd) {
  var pos, dir, word, head, line;

  while (toAdd--) {
    pos         = Game.randomPos();
    dir         = Asteroids.Vector.random();
    head        = Asteroids.Vector.random();
    word        = Game.KEY_WORDS[Game.KEY_WORDS.length * Math.random() | 0];

    line = Asteroids.Char.newLine(pos, dir, word, head, Asteroids.RotChar, {});
    this.chars.push.apply(this.chars, line);
  }
};

Asteroids.Game.prototype.addAttacker = function () {
  var pos = new Asteroids.Vector({x:0, y:250})
      dir = new Asteroids.Vector({x: 1, y:0}),
      head = new Asteroids.Vector({x: 1, y:1}).norm(),
      word = "TypeError",
      lineInfo = _.extend({}, Asteroids.AttackChar.LINE_DEFAULTS);

  line = Asteroids.Char.newLine(pos, dir, word, head, Asteroids.AttackChar, {line: lineInfo});
  this.chars.push.apply(this.chars, line);
};

Game.randomPos = function () {
  return new Asteroids.Vector(
      {
        x: Math.random() * Game.DIM_X,
        y: Math.random() * Game.DIM_Y
      });
};

Game.wrapLeft = function (pos) {
  pos.add({x: -Game.DIM_X, y: 0});
};

Game.wrapRight = function (pos) {
  pos.add({x: Game.DIM_X, y: 0});
};

Game.wrapUp = function (pos) {
  pos.add({x: 0, y: -Game.DIM_Y});
};

Game.wrapDown = function (pos) {
  pos.add({x: 0, y: Game.DIM_Y});
};

Game.wrap = function (pos) {
  pos.x < 0          && Game.wrapRight(pos);
  pos.x > Game.DIM_X && Game.wrapLeft(pos);
  pos.y < 0          && Game.wrapDown(pos);
  pos.y > Game.DIM_Y && Game.wrapUp(pos);
};

Game.prototype.draw = function(ctx) {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  Game.drawObjects(this.chars, ctx);
  this.ship.draw(ctx);
  Game.drawObjects(this.bullets, ctx);
};

Game.drawObjects = function (objects, ctx) {
  objects.forEach(function (object) {
    object.draw(ctx);
  });
};

Game.prototype.step = function () {
  Game.moveObjects(this.chars);
  Game.moveObjects([this.ship]);
  Game.moveObjects(this.bullets);

  Game.checkCollisions(this.bullets, this.chars);
  Game.checkCollisions([this.ship],  this.chars);

  this.chars   = Game.remove(this.chars);
  this.bullets = Game.remove(this.bullets);
};

Game.moveObjects = function (objects) {
  objects.forEach(function (object) {
    object.move(Game.DIM_X, Game.DIM_Y);
  });
};

Game.checkCollisions = function (objects0, objects1) {
  objects0.forEach(function (obj0) {
    objects1.forEach(function (obj1) {
      obj0.isCollidedWith(obj1) && obj0.handleCollision(obj1);
    });
  });
};

Game.remove = function (objects) {
  return _.filter(objects, function (obj) { return !obj.remove; });
};

Game.prototype.handleInputs = function () {
  var bullet;

  if (key.isPressed("space")) {
    bullet = this.ship.fireBullet();
    bullet !== null && this.bullets.push(bullet);
  }

  key.isPressed("up")    && this.ship.power(Asteroids.Ship.ACCEL);
  key.isPressed("down")  && this.ship.power(-Asteroids.Ship.ACCEL);
  key.isPressed("left")  && this.ship.rotate(-Asteroids.Ship.ROTATION);
  key.isPressed("right") && this.ship.rotate(Asteroids.Ship.ROTATION);
};
})();
