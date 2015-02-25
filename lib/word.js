(function () {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  }

  var Word = Asteroids.Word = function (keys) {
    keys.r = keys.word.length * Asteroids.Asteroid.RADIUS / 2;
    Asteroids.MovingObject.call(this, keys);
  }

  Asteroids.Util.inherits(Word, Asteroids.MovingObject);

  Word.prototype.move = function (maxX, maxY) {
    Asteroids.MovingObject.prototype.move.call(this, maxX, maxY);
    Asteroids.Util.vecRot(this.orientation, 2 * Math.PI / 100);
  };

  // Word.prototype.handleCollision = function (bullet) {
  //   // var i, d;
  //   // var start = this.r + Asteroids.Asteroid.RADIUS / 2;
  //   // start = Asteroids.Util.vecMult(start, this.orientation.slice());
  //   // Asteroids.Util.vecAdd(start, this.pos);
  //   //
  //   // for (i = 0; i < this.word.length; i++) {
  //   //   d = Asteroids.Util.distance(start, bullet.pos);
  //   //   if (d < Asteroids.Asteroid.RADIUS + bullet.r) {
  //   //     // make a new word using letters 0 to i at position
  //   //     // make a new word using letters i + 1 to word.length
  //   //     // return the new words
  //   //     return this.split(i);
  //   //   }
  //   // }
  // }

  Word.prototype.draw = function (ctx) {
    ctx.beginPath()
    ctx.moveTo.apply(ctx, Asteroids.Util.vecAdd(this.pos.slice(), this.orientation, -this.r));
    ctx.lineTo.apply(ctx, Asteroids.Util.vecAdd(this.pos.slice(), this.orientation, this.r));
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'red';
    ctx.stroke();

    this.letterPoses().forEach(function (pos) {
      console.log('filling', pos)
      ctx.beginPath();
      ctx.arc(pos[0], pos[1], Asteroids.Asteroid.RADIUS, 0, 2 * Math.PI);
      ctx.fill();
    })
  };

  Word.prototype.letterPoses = function () {
    var start = -this.r - Asteroids.Asteroid.RADIUS / 2,
      poses = [], i;

    start = Asteroids.Util.vecMult(start, this.orientation.slice());
    Asteroids.Util.vecAdd(start, this.pos);
    for (i = 0; i < this.word.length; i++) {
      poses.push(start);
      start = Asteroids.Util.vecAdd(start.slice(), this.orientation, Asteroids.Asteroid.RADIUS*2);
    }

    return poses;
  };
})();
