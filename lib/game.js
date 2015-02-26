(function () {
  if (typeof(window.Asteroids) === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    //this.bugs      = [];
    //this.bugBullets = [];
    this.bullets   = [];
    this.addAsteroids(Game.NUM_LINES);
    this.ship = new Asteroids.Ship({pos: Game.randomPos()});
  };

  Asteroids.Game.prototype.addAsteroids = function (toAdd) {
    var i, center, orientation, word, line;

    while (toAdd--) {
      start = Game.randomPos();
      orientation = Asteroids.Vector.random();
      word = Game.KEY_WORDS[Game.KEY_WORDS.length * Math.random() | 0];

      line = Asteroids.Asteroid.newLine(start, orientation, word);
      this.asteroids.push.apply(this.asteroids, line);
    }
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

    Game.drawObjects(this.asteroids, ctx);
    this.ship.draw(ctx);
    Game.drawObjects(this.bullets, ctx);
  };

  Game.drawObjects = function (objects, ctx) {
    objects.forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.step = function () {
    Game.rotateObjects(this.asteroids);
    Game.moveObjects(this.asteroids);
    Game.moveObjects([this.ship]);
    Game.moveObjects(this.bullets);

    Game.checkCollisions(this.bullets, this.asteroids);
    Game.checkCollisions([this.ship],  this.asteroids);

    this.asteroids = Game.remove(this.asteroids);
    this.bullets   = Game.remove(this.bullets);
  };

  Game.moveObjects = function (objects) {
    objects.forEach(function (object) {
      object.move(Game.DIM_X, Game.DIM_Y);
    });
  };

  Game.rotateObjects = function (objects) {
    objects.forEach(function (object) {
      object.rotate();
    });
  };

  Game.checkCollisions = function (objects0, objects1) {
    objects0.forEach(function (object0) {
      objects1.forEach(function (object1) {
        object0.isCollidedWith(object1) && object0.handleCollision(object1);
      });
    });
  };

  Game.remove = function (objects) {
    return objects.filter(function (object) {
      return !object.remove;
    });
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
