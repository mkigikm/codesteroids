(function () {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (keys) {
    var key

    for (key in keys) {
      this[key] = keys[key];
    }
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(this.pos[0], this.pos[1], this.r, 0, 2 * Math.PI);

    ctx.fill();
  };

  MovingObject.prototype.move = function () {
    Asteroids.Util.vecAdd(this.pos, this.vel());
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var d = Asteroids.Util.distance(this.pos, otherObject.pos);

    return (d < (this.r + otherObject.r));
  };

  MovingObject.prototype.isWrappable = function () {
    return true;
  };

  MovingObject.prototype.vel = function () {
    return Asteroids.Util.vecMult(this.speed, this.head.slice());
  };
})();
