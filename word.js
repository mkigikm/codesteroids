(function () {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  }

  var Word = function Asteroids.Word = function (keys) {
    keys.r = keys.word.length * Asteroids.Asteroid.RADIUS;
    Asteroids.MovingObject.call(this.keys);
  }

  Asteroids.Util.inherits(Word, Asteroids.MovingObject);

  Word.prototype.move = function (maxX, maxY) {
    Asteroids.MovingObject.prototype.move.call(this, maxX, maxY);
    Asteroids.Util.vecRot(this.orientation, 2 * Math.PI / 100);
  };

  Word.prototype.handleCollision = function (bullet) {
    var i, d;
    var start = this.r + Asteroids.Asteroid.RADIUS / 2;
    start = Asteroids.Util.vecMult(start, this.orientation.slice());
    Asteroids.Util.vecAdd(start, this.pos);

    for (i = 0; i < this.word.length; i++) {
      d = Asteroids.Util.distance(start, bullet.pos);
      if (d < Asteroids.Asteroid.RADIUS + bullet.r) {
        // make a new word using letters 0 to i at position
        // make a new word using letters i + 1 to word.length
        // return the new words
        return this.split(i);
      }
    }
  }
}
