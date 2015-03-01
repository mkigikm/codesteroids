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
  return this.addC(vec, -1).mag();
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
  return Math.sqrt(this.dot(this));
};

Vector.prototype.toString = function () {
  return "(" + this.x + "," + this.y + ")";
};

Vector.prototype.project = function (vec) {
  return vec.multC(this.dot(vec) / vec.dot(vec));
};

Vector.prototype.angle = function () {
  return Math.atan2(-this.y, this.x);
};

Vector.collide = function (pu, mu, u, pv, mv, v) {
  var n = pu.addC(pv, -1).norm(), un0, un1, vn0, vn1, ut, vt;

  un0 = u.project(n);
  vn0 = v.project(n);

  ut = u.addC(un0, -1);
  vt = v.addC(vn0, -1);

  un1 = un0.multC(mu - mv).add(vn0.multC(2 * mv)).mult(1 / (mu + mv));
  vn1 = vn0.multC(mv - mu).add(un0.multC(2 * mu)).mult(1 / (mu + mv));

  u.set(ut.add(un1));
  v.set(vt.add(vn1));
};
})();
