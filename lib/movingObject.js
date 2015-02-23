(function () {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  }

  Asteroids.MovingObject = function (keys) {
    for (key in keys) {
      this[key] = keys[key];
    }
  };

  Asteroids.MovingObject.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.r,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  Asteroids.MovingObject.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };
})();
