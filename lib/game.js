(function () {
  if (typeof(window.Asteroids) === 'undefined') {
    window.Asteroids = {};
  }

  Asteroids.Game = function () {
    this.asteroids = [];
    this.addAsteroids();
  };

  Asteroids.Game.DIM_X = 500;
  Asteroids.Game.DIM_Y = 500;
  Asteroids.Game.NUM_ASTEROIDS = 20;

  Asteroids.Game.prototype.addAsteroids = function () {
    var i,
        keys;

    for (i = 0; i < Asteroids.Game.NUM_ASTEROIDS; i++) {
      keys = {pos: this.randomPos()};
      console.log(keys.pos[0], keys.pos[1])

      this.asteroids.push(new Asteroids.Asteroid(keys))
    }
  };

  Asteroids.Game.prototype.randomPos = function () {
    return [Math.random() * Asteroids.Game.DIM_X,
      Math.random() * Asteroids.Game.DIM_Y];
  };

  Asteroids.Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Asteroids.Game.DIM_X, Asteroids.Game.DIM_Y);

    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
  };

  Asteroids.Game.prototype.moveObjects = function () {
    this.asteroids.forEach(function (asteroid) {
      asteroid.move();
      this.wrap(asteroid.pos);
    }, this);
  };

  Asteroids.Game.prototype.wrap = function (pos) {
    if (pos[0] > Asteroids.Game.DIM_X) {
      Asteroids.Util.vecAdd(pos, [-Asteroids.Game.DIM_X, 0]);
    }
    if (pos[1] > Asteroids.Game.DIM_Y) {
      Asteroids.Util.vecAdd(pos, [0, -Asteroids.Game.DIM_Y]);
    }
  };

})();
