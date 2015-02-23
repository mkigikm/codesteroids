(function () {
  if (typeof(window.Asteroids) === 'undefined') {
    window.Asteroids = {};
  }

  function Asteroids.Game () {
    this.asteroids = [];
    this.addAsteroids();
  };

  Asteroids.Game.DIM_X = 500;
  Asteroids.Game.DIM_Y = 500;
  Asteroids.Game.NUM_ASTEROIDS = 20;

  Asteroids.Game.addAsteroids = function () {
    var i;

    for (i = 0; i < Asteroids.Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid({pos: this.randomPos()}))
    }
  };

  Asteroids.Game.randomPos = function () {
    var center = [Asteroids.Game.DIM_X / 2, Asteroids.Game.DIM_Y / 2];

    return Asteroids.Util.vecAdd(Asteroids.Util.randomVec(10), center);
  };

  Asteroids.Game.draw = function(ctx) {
    ctx.clearRect(0, 0, Asteroids.Game.DIM_X, Asteroids.Game.DIM_Y);

    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
  };

  Asteroids.Game.moveObjects = function () {
    this.asteroids.forEach(function (asteroid) {
      asteroid.move();
    });
  };

})();
