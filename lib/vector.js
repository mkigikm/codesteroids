(function () {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  }

  var Vector = Asteroids.Vector = function (coords) {
    var coord;

    for (coord in coords) {
      this[coord] = coords[coord];
    }
  };

  Vector.prototype.add = function (vec, mag) {
    if (typeof mag === "undefined") mag = 1;

    this.x += mag * vec.x;
    this.y += mag * vec.y;
    return this;
  };

  Vector.prototype.addC = function (vec, mag) {
    return new Vector(this).add(vec, mag);
  };

  Vector.prototype.rot = function (theta) {
    var rx = this.x * Math.cos(theta) - this.y * Math.sin(theta),
        ry = this.x * Math.sin(theta) + this.y * Math.cos(theta);

    this.x = rx;
    this.y = ry;

    return this;
  };

  Vector.prototype.rotC = function (theta) {
    return new Vector(this).rot(theta);
  };

  Vector.prototype.mult = function (mag) {
    this.x *= mag;
    this.y *= mag;

    return this;
  };

  Vector.prototype.multC = function (mag) {
    return new Vector(this).mult(mag);
  };

  Vector.prototype.dist = function (vec) {
    var dx = this.x - vec.x,
        dy = this.y - vec.y;

    return Math.sqrt(dx * dx + dy * dy);
  };

  Vector.prototype.midPoint = function (pos) {
    return this.addC(pos).mult(0.5);
  };

  Vector.random = function (len) {
    var x, y;
    len = len || 1;
    x = Math.random() * len * len;
    y = Math.sqrt(len * len - x * x);
    x *= Math.random() < 0.5 ? -1 : 1;
    y *= Math.random() < 0.5 ? -1 : 1;

    return new Vector({x: x, y: y});
  };

  Vector.prototype.copy = function () {
    return new Vector(this);
  };
})();
