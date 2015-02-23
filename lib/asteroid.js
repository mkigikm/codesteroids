(function () {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  }

  Asteroids.Asteroid = function (keys) {
    keys.color = Asteroids.Asteroid.COLOR;
    keys.r     = Asteroids.Asteroid.RADIUS;
    keys.vel   = Asteroids.Util.randomVec(Asteroids.Asteroid.STARTING_VEL);

    Asteroids.MovingObject.call(this, keys);
  };

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

  Asteroids.Asteroid.COLOR = 'red';
  Asteroids.Asteroid.RADIUS = 10;
  Asteroids.Asteroid.STARTING_VEL = 1;



})();
