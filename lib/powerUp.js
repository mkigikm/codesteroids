(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var PowerUp = Asteroids.PowerUp = function (keys) {
    this.r = 5;
    this.color = PowerUp.COLOR;
    keys.head = [0, 0];
    keys.speed = 0;

    Asteroids.MovingObject.call(this, keys);
  };

  PowerUp.COLOR = 'yellow';
  PowerUp.RADIUS = 5;

  Asteroids.Util.inherits(PowerUp, Asteroids.MovingObject);
})();
