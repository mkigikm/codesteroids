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

    if (orientation[0] < 0) {
      orientation[0] *= -1;
    }

    for (i = 0; i < word.length; i++) {
      formation.push(new Asteroid({pos: pos, head: heading.slice(),
          speed: 2, char: word[i]}));

      if (i !== 0) {
        formation[i - 1].right = formation[i];
        formation[i].left      = formation[i - 1];
        // console.log('distance', Asteroids.Util.distance(formation[i].pos, formation[i-1].pos))
      }
      pos = Asteroids.Util.vecAdd(pos.slice(), orientation, 3 * Asteroid.RADIUS);
      // console.log(Asteroids.Util.distance(orientation, [0, 0]))
    }
    // console.log('distance across', word.length, Asteroids.Util.distance(formation[0].pos, formation[word.length - 1].pos))

    return formation;
  };

  Asteroid.prototype.draw = function (ctx) {
    Asteroids.MovingObject.prototype.draw.call(this, ctx);
    ctx.fillStyle = Asteroid.COLOR;
    ctx.font      = Asteroid.FONT;
    // ctx.fillText(this.char, this.pos[0]-5, this.pos[1]+5);
  };

  Asteroid.prototype.rotate = function () {
    var leftMost = this, rightMost = this, mid;

    while (leftMost.left) {
      if (Asteroids.Util.distance(leftMost.pos, leftMost.left.pos) > 5 * Asteroid.RADIUS)
        return;
      leftMost = leftMost.left;
    }

    while (rightMost.right) {
      if (Asteroids.Util.distance(rightMost.pos, rightMost.right.pos) > 5 * Asteroid.RADIUS)
        return;
      rightMost = rightMost.right;
    }

    // if (leftMost.quadrent() !== this.quadrent() || rightMost.quadrent() !== this.quadrent())
    //   return;

    // console.log(leftMost.pos, rightMost.pos)
    mid = Asteroids.Util.midPoint(leftMost.pos, rightMost.pos);
    // console.log('midpoint', mid)
    rotVec = Asteroids.Util.vecAdd(this.pos.slice(), mid, -1);
    // console.log(mid, rotVec)
    // if (Asteroids.Util.parallel(leftMost.pos, rightMost.pos, mid)) {
      this.pos = Asteroids.Util.vecAdd(mid, Asteroids.Util.vecRot(rotVec, 2*Math.PI/100));
    // }
  };
})();
