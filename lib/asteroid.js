(function () {
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
    return Asteroids.Util.randomVec(1);
  };

  Asteroid.startingSpeed = function () {
    return Math.random() + 1;
  };

  Asteroid.newLine = function (start, orientation, word) {
    var formation = [],
        heading = Asteroids.Util.randomVec(1),
        speed   = Asteroid.startingSpeed(),
        pos = start.slice(),
        i;

    for (i = 0; i < word.length; i++) {
      formation.push(new Asteroid({pos: pos, head: heading.slice(),
          speed: 2, char: word[i]}));

      if (i !== 0) {
        formation[i - 1].right = formation[i];
        formation[i].left      = formation[i - 1];
      }
      pos = Asteroids.Util.vecAdd(pos.slice(), orientation, 3 * Asteroid.RADIUS);
    }

    return formation;
  };

  Asteroid.prototype.draw = function (ctx) {
    // Asteroids.MovingObject.prototype.draw.call(this, ctx);
    ctx.fillStyle = Asteroid.COLOR;
    ctx.font      = Asteroid.FONT;
    ctx.fillText(this.char, this.pos[0]-5, this.pos[1]+5);
  };
})();
