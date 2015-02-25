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
    // Asteroids.MovingObject.prototype.draw.call(this, ctx);
    ctx.fillStyle = Asteroid.COLOR;
    ctx.font      = Asteroid.FONT;
    ctx.fillText(this.char, this.pos[0]-5, this.pos[1]+5);
  };

  Asteroid.prototype.rotate = function (centers) {
    mid      = this.findCenter(centers);
    this.center = null;
    rotVec   = Asteroids.Util.vecAdd(this.pos.slice(), mid, -1);
    // console.log('midpoint',mid);
    // console.log('rotVec',rotVec)
    // console.log(this.pos)
    // console.log(Asteroids.Util.vecAdd(Asteroids.Util.vecRot(rotVec, 2*Math.PI/100),mid);
    this.pos = Asteroids.Util.vecAdd(Asteroids.Util.vecRot(rotVec, 2*Math.PI/100),mid);
  };

  Asteroid.prototype.findCenter = function (xMax, yMax) {
    var leftMost = this, rightMost = this, mid, wrapL, wrapR, wrapU, wrapD;

    if (this.center) {
      return this.center;
    };

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

    mid  = Asteroids.Util.midPoint(leftMost.pos, rightMost.pos);
    // console.log(mid)
    wrapR = mid[0] < 0;
    wrapL = mid[0] > Asteroids.Game.DIM_X;
    wrapD = mid[1] < 0;
    wrapU = mid[1] > Asteroids.Game.DIM_Y;
    Asteroids.Game.wrap(mid);

    while (leftMost) {
      leftMost.center = mid;

      if (wrapR) {
        Asteroids.Game.wrapRight(leftMost.pos);
      }
      if (wrapL) {
        Asteroids.Game.wrapLeft(leftMost.pos);
      }
      if (wrapU) {
        Asteroids.Game.wrapUp(leftMost.pos);
      }
      if (wrapD) {
        Asteroids.Game.wrapDown(leftMost.pos);
      }
      leftMost = leftMost.right;
    }

    return mid
  };

  Asteroid.prototype.isWrappable = function () {
    return false;
  };
})();
