;(function () {
if (typeof(window.Asteroids) === 'undefined') {
  window.Asteroids = {};
}

var Game = Asteroids.Game = function () {
  this.restart();

  key("p", function () {
    this.paused = !this.paused
  }.bind(this));
};

Game.prototype.restart = function () {
  this.chars    = [];
  this.bullets  = [];
  this.powerUps = [];
  this.ship = new Asteroids.Ship(
    new Asteroids.Vector({x: Game.DIM_X / 2, y: Game.DIM_Y / 2})
  );

  this.addChars(Game.NUM_LINES);
  this.paused  = false;
  this.victory = false;
  this.dead    = false;
  key.unbind("r");
};

Game.prototype.addChars = function (toAdd) {
  var pos, word, line;

  _.times(toAdd, function () {
    pos  = Game.startingPos();
    word = _.sample(Game.KEY_WORDS);

    line = Asteroids.Char.newLine(pos, word, Asteroids.RotChar);
    this.chars.push.apply(this.chars, line);
  }, this);
};

Game.randomPos = function () {
  return new Asteroids.Vector({
    x: Math.random() * Game.DIM_X,
    y: Math.random() * Game.DIM_Y
  });
};

Game.startingPos = function () {
  var axis = Math.random(), pos = {};

  if (axis < 0.5) {
    pos.x = Math.random() * Game.DIM_X;
    pos.y = axis < 0.25 ? 0 : Game.DIM_Y;
  } else {
    pos.x = axis < 0.75 ? 0 : Game.DIM_X;
    pos.y = Math.random() * Game.DIM_Y;
  }

  return new Asteroids.Vector(pos);
};

Game.outOfBounds = function (pos) {
  return pos.x < 0 || pos.x > Game.DIM_X ||
      pos.y < 0 || pos.y > Game.DIM_Y;
};

Game.prototype.draw = function(ctx) {
  Game.drawObjects(this.chars, ctx);
  this.ship.draw(ctx);
  Game.drawObjects(this.bullets, ctx);
  Game.drawObjects(this.powerUps, ctx);
};

Game.drawObjects = function (objects, ctx) {
  objects.forEach(function (object) {
    object.draw(ctx);
  });
};

Game.prototype.step = function () {
  if (this.paused) return;

  Game.moveObjects(this.chars, this.ship);
  Game.moveObjects([this.ship]);
  Game.moveObjects(this.bullets, this.chars);
  Game.moveObjects(this.powerUps);

  Game.checkCollisions(this.bullets, this.chars);
  Game.checkCollisions([this.ship],  this.chars);
  Game.checkCollisions(this.powerUps, [this.ship]);

  this.fireShots();

  this.addPowerUps();

  this.chars    = Game.remove(this.chars);
  this.bullets  = Game.remove(this.bullets);
  this.powerUps = Game.remove(this.powerUps);

  this.checkVictory();
  this.checkDeath();

  this.ship.victory = this.victory = this.chars.length === 0;
};

Game.prototype.checkVictory = function () {
  if (this.victory) return;

  this.ship.victory = this.victory = this.chars.length === 0;
  if (this.victory) key("r", this.restart.bind(this));
};

Game.prototype.checkDeath = function () {
  if (this.dead) return;

  this.dead = this.ship.health.off();
  if (this.dead) key("r", this.restart.bind(this));
};

Game.prototype.addPowerUps = function () {
  var powerUp;

  this.chars.forEach(function (char) {
    powerUp = char.drop();
    powerUp && this.powerUps.push(powerUp);
  }, this);
};

Game.moveObjects = function (objects, params) {
  objects.forEach(function (object) {
    object.move(params);
  });
};

Game.checkCollisions = function (objects0, objects1) {
  objects0.forEach(function (obj0) {
    objects1.forEach(function (obj1) {
      obj0.isCollidedWith(obj1) && obj0.handleCollision(obj1);
    });
  });
};

Game.prototype.fireShots = function () {
  var shots = [], shot;

  this.chars.forEach(function (char) {
    shot = char.fireShot(this.ship);
    shot && shots.push(shot);
  }, this);

  this.chars.push.apply(this.chars, shots);
};

Game.remove = function (objects) {
  return _.filter(objects, function (obj) { return !obj.remove; });
};

Game.prototype.handleInputs = function () {
  var bullet;

  if (this.paused || this.victory) return;

  if (key.isPressed("z")) {
    bullet = this.ship.fireGuidedBullet();
    bullet && this.bullets.push(bullet);
  }

  key.isPressed("x") &&
      this.bullets.push.apply(this.bullets, this.ship.fireSpreadBullets());

  key.isPressed("up")    && this.ship.accelerate();
  key.isPressed("down")  && this.ship.decelerate();
  key.isPressed("left")  && this.ship.rotate(-1);
  key.isPressed("right") && this.ship.rotate(1);
};
})();
