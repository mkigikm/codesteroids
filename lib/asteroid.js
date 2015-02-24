(function () {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (keys) {
    keys.color     = Asteroids.Asteroid.COLOR;
    keys.r         = Asteroids.Asteroid.RADIUS;
    keys.formation = {left: null, right: null};

    Asteroids.MovingObject.call(this, keys);
  };

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.startingHead = function() {
    return Asteroids.Util.randomVec(1);
  };

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };

  Asteroid.prototype.startingSpeed = function () {
    return Math.random() + 1;
  };

  Asteroid.newLine = function (start, orientation, word, returnHead) {
    var head = null, tail = null, cur,
        head = Asteroids.Util.randomVec(1),
        pos = start.slice(),
        i;

    for (i = 0; i < word.length; i++) {
      cur = new Asteroid({pos: pos, head: head.slice(), speed: 2, char: word[i]});

      if (tail === null) {
        head = tail = cur;
      } else {
        tail.link(cur);
        tail.formation.right = cur;
        cur.formation.left   = tail;
        tail = cur;
      }
      pos = Asteroids.Util.vecAdd(pos.slice(), orientation, 3 * Asteroid.RADIUS);
    }

    return returnHead ? head : tail;
  };

  Asteroid.prototype.draw = function (ctx) {
    // Asteroids.MovingObject.prototype.draw.call(this, ctx);
    ctx.fillStyle = 'green';
    ctx.font = "bold 20px Arial";
    ctx.fillText(this.char, this.pos[0]-5, this.pos[1]+5);
  };

})();
