(function () {
  if (typeof(window.Asteroids) === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets =   [];
    this.powerUps =  [];
    this.addAsteroids();
    this.cooldown = 0;
    this.ship = new Asteroids.Ship({pos: this.randomPos()});
  };

  Game.DIM_X = 800;
  Game.DIM_Y = 800;
  Game.NUM_LINES = 10;
  Game.BULLET_COOLDOWN = 20;
  Game.KEY_WORDS = [
    "abstract","arguments","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete","do","double","else","enum","eval","export","extends","false","final","finally","float",
    "for","function","goto","if","implements","import","in","instanceof","int","interface","let","long","native","new","null","package","private","protected","public","return","short","static","super","switch","synchronized",
    "this","throw","throws","transient","true","try","typeof","var","void","volatile","while","with","yield"
  ]

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

          while (cur = cur.left) {
            Asteroids.Util.rotateVec(cur.head, Math.PI / 2);
            console.log('rotating left')
          }

          cur = asteroid;
          while (cur = cur.right) {
            Asteroids.Util.rotateVec(cur.head, -Math.PI / 2);
            console.log('rotating right')
          }

          //set these to null now
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

    this.bullet_cooldown--;
    this.bullet_cooldown = Math.max(this.bullet_cooldown, 0);

    if (key.isPressed("space") && !this.bullet_cooldown) {
      bullet = this.ship.fireBullet();
      this.addBullet(bullet);
      this.bullet_cooldown = Game.BULLET_COOLDOWN;
    }

    if (key.isPressed("up")) {
      this.ship.power(0.1);
    }

    if (key.isPressed("down")) {
      this.ship.power(-0.1);
    }

    if (key.isPressed("left")) {
      this.ship.rotate(-Math.PI/50);
    }

    if (key.isPressed("right")) {
      this.ship.rotate(Math.PI/50);
    }
  };
})();
