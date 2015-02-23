(function () {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  }

  Asteroids.Asteroid = function (keys) {
    keys.color = Asteroid.COLOR;
    keys.r     = Asteroid.RADIUS;
    keys.vel   = Asteroids.Util.randomVec();

    Asteroids.MovingObject.call(this, keys);
  };

  Asteroids.Asteroid.COLOR = 'red';
  Asteroids.Asteroid.RADIUS = 10;

  

})();
