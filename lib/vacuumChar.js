;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

var VacuumChar = Asteroids.VacuumChar = function (pos, char) {
  Asteroids.Char.call(this, pos, char, Asteroids.RotChar.ATTRS);
  console.log(this.pos.toString())
  this.vacuumTimer = new Asteroids.Util.Timer(0, 120);
};

Asteroids.Util.inherits(Asteroids.VacuumChar, Asteroids.Char);

VacuumChar.prototype.move = function (ship) {
  this.turnOnVacuum(ship);
};

VacuumChar.prototype.turnOnVacuum = function (ship) {
  var vec = this.pos.subC(ship.pos).norm();
  if (ship.dist(this) < 300) ship.guidance.external = vec.mult(2.5);
  !this.vacuumTimer.tick() && this.vacuumTimer.reset();
};

VacuumChar.prototype.draw = function (ctx) {
  var r = (this.vacuumTimer.value / 12 | 0) * 12;
  Asteroids.Char.prototype.draw.call(this, ctx);
  ctx.beginPath();
  ctx.arc(this.pos.x, this.pos.y, r * 10 / 4, 0, 2 * Math.PI);
  ctx.strokeStyle = 'purple';
  ctx.stroke();
};
})();
