(function () {
  if (typeof(window.Asteroids) === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = null;
    this.bullets =   [];
    this.powerUps =  [];
    this.addAsteroids();
    this.ship = new Asteroids.Ship({pos: this.randomPos()});
  };


  Asteroids.Game.prototype.addAsteroids = function () {
    var i, center, orientation, word;

    for (i = 0; i < Game.NUM_LINES; i++) {
      start = this.randomPos();
      orientation = Asteroids.Util.randomVec(1);
      word = Game.KEY_WORDS[Game.KEY_WORDS.length * Math.random() | 0];

      this.asteroids.push.apply(this.asteroids,
        Asteroids.Asteroid.newLine(start, orientation, word));
    }
  };

  Game.prototype.randomPos = function () {
    return [Math.random() * Game.DIM_X,
      Math.random() * Game.DIM_Y];
  };

  Game.prototype.draw = function(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();

      if (this.isOutOfBounds(object.pos) && !object.isWrappable()) {
        object.remove = true;
      }

      this.wrap(object.pos);
    }, this);
  };

  Game.prototype.wrap = function (pos) {
    if (pos[0] > Game.DIM_X) {
      Asteroids.Util.vecAdd(pos, [-Game.DIM_X, 0]);
    }
    if (pos[0] < 0) {
      Asteroids.Util.vecAdd(pos, [Game.DIM_X, 0]);
    }
    if (pos[1] > Game.DIM_Y) {
      Asteroids.Util.vecAdd(pos, [0, -Game.DIM_Y]);
    }
    if (pos[1] < 0) {
      Asteroids.Util.vecAdd(pos, [0, Game.DIM_Y]);
    }
  };

  Game.prototype.checkCollisions = function () {
    this.checkShipCollisions();
    this.checkBulletCollisions();
  }

  Game.prototype.checkShipCollisions = function () {
    var relocateShip = false;

    this.asteroids.forEach(function (asteroid) {
      relocateShip = relocateShip || asteroid.isCollidedWith(this.ship);
    }, this);
    if (relocateShip) {
      this.ship.relocate(this.randomPos());
    }
  };

  Game.prototype.checkBulletCollisions = function () {
    var cur;

    this.bullets.forEach(function (bullet) {
      this.asteroids.forEach(function (asteroid) {
        if (asteroid.isCollidedWith(bullet)) {
          asteroid.remove = true;
          bullet.remove   = true;
          cur = asteroid;
          console.log('hit', cur)

          while (cur = cur.formation.left) {
            console.log('rotating left', cur)
            Asteroids.Util.vecRot(cur.head, Math.PI / 2);
          }

          cur = asteroid;
          while (cur = cur.formation.right) {
            console.log('rotating right')
            Asteroids.Util.vecRot(cur.head, -Math.PI / 2);
          }

          //set these to null now
          asteroid.formation.left  = null;
          asteroid.formation.right = null;
        }
      });
    }, this);
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
    this.removeAsteroids();
    this.removeBullets();
  };

  Game.prototype.removeAsteroids = function () {
    var newAsteroids = [];

    this.asteroids.forEach(function (asteroid) {
      if (!asteroid.remove) {
        newAsteroids.push(asteroid)
      }
    });

    this.asteroids = newAsteroids;
  };

  Game.prototype.removeBullets = function () {
    var newBullets = [];

    this.bullets.forEach(function (bullet) {
      if (!bullet.remove) {
        newBullets.push(bullet)
      }
    });

    this.bullets = newBullets;
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship]).concat(this.bullets).concat(this.powerUps);
  };

  Game.prototype.addBullet = function (bullet) {
    this.bullets.push(bullet);
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0 || pos[1] < 0 || pos[0] > Game.DIM_X || pos[1] > Game.DIM_Y);
  };

  Game.prototype.handleInputs = function () {
    var bullet;


    if (key.isPressed("space")) {
      bullet = this.ship.fireBullet();
      bullet && this.addBullet(bullet);
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
