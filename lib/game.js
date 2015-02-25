(function () {
  if (typeof(window.Asteroids) === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets   = [];
    this.addAsteroids(Game.NUM_LINES);
    this.ship = new Asteroids.Ship({pos: Game.randomPos()});
    // this.word = new Asteroids.Word({pos: Game.randomPos(), head:Asteroids.Util.randomVec(1),
    //     orientation: Asteroids.Util.randomVec(1), speed:2, word:"hello"});
  };

  Asteroids.Game.prototype.addAsteroids = function (toAdd) {
    var i, center, orientation, word, line;

    while (toAdd--) {
      start = Game.randomPos();
      orientation = Asteroids.Util.randomVec(1);
      word = Game.KEY_WORDS[Game.KEY_WORDS.length * Math.random() | 0];

      line = Asteroids.Asteroid.newLine(start, orientation, word);
      this.asteroids.push.apply(this.asteroids, line);
    }
    console.log('asteroids', this.asteroids.length)
    console.log(this.asteroids[0].pos)
  };

  Game.randomPos = function () {
    return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
  };

  Game.outOfBounds = function (pos) {
    return pos[0] < 0 || pos[0] > Game.DIM_X ||
        pos[1] < 0 || pos[1] > Game.DIM_Y;
  };

  Game.wrapLeft = function (pos) {
    Asteroids.Util.vecAdd(pos, [-Game.DIM_X, 0]);
  };

  Game.wrapRight = function (pos) {
    Asteroids.Util.vecAdd(pos, [Game.DIM_X, 0]);
  };

  Game.wrapUp = function (pos) {
    Asteroids.Util.vecAdd(pos, [0, -Game.DIM_Y]);
  };

  Game.wrapDown = function (pos) {
    Asteroids.Util.vecAdd(pos, [0, Game.DIM_Y]);
  };

  Game.wrap = function (pos) {
    if (pos[0] < 0) {
      Game.wrapRight(pos);
    }

    if (pos[0] > Game.DIM_X) {
      Game.wrapLeft(pos);
    }

    if (pos[1] < 0) {
      Game.wrapDown(pos);
    }

    if (pos[1] > Game.DIM_Y) {
      Game.wrapUp(pos);
    }
  };

  Game.prototype.draw = function(ctx) {
    var cur;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    Game.drawObjects(this.asteroids, ctx);
    this.ship.draw(ctx);
    Game.drawObjects(this.bullets, ctx);
    // this.word.draw(ctx);
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

    // this.asteroids.forEach(function (asteroid) {
    //   asteroid.rotate();
    // });

    // this.word.move(Game.DIM_X, Game.DIM_Y);
  };

  Game.moveObjects = function (objects) {
    objects.forEach(function (object) {
      object.move(Game.DIM_X, Game.DIM_Y);
    });
  };

  Game.rotateObjects = function (objects) {
    var centers = {};

    objects.forEach(function (object) {
      object.rotate();
    });
  };

  Game.checkCollisions = function (objects0, objects1) {
    objects0.forEach(function (object0) {
      objects1.forEach(function (object1) {
        if (object0.isCollidedWith(object1)) {
          object0.handleCollision(object1);
        }
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

    if (key.isPressed("up")) {
      this.ship.power(Asteroids.Ship.ACCEL);
    }

    if (key.isPressed("down")) {
      this.ship.power(-Asteroids.Ship.ACCEL);
    }

    if (key.isPressed("left")) {
      this.ship.rotate(-Asteroids.Ship.ROTATION);
    }

    if (key.isPressed("right")) {
      this.ship.rotate(Asteroids.Ship.ROTATION);
    }
  };
})();
