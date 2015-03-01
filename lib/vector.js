;(function () {
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

Vector.prototype.norm = function () {
  return this.mult(1 / this.mag());
};

Vector.prototype.dot = function (vec) {
  return this.x * vec.x + this.y * vec.y;
};

Vector.prototype.set = function (vec) {
  this.x = vec.x, this.y = vec.y;

  return this;
};

Vector.prototype.mag = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.toString = function () {
  return "(" + this.x + "," + this.y + ")";
};

Vector.collide = function (pos0, pos1, vec0, vec1) {
  var n = pos1.addC(pos0, -1), vn0, vn1, vt0, vt1;
  n.norm();

  vn1 = n.multC(vec1.dot(n));
  vn0 = n.mult(vec0.dot(n));

  vt1 = vn1.addC(vec1, -1);
  vt0 = vn0.addC(vec0, -1);

  vec1.set(vt1.add(vn0));
  vec0.set(vt0.add(vn1));
};
})();
