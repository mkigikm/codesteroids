;(function () {
if (typeof window.Asteroids === "undefined") {
  window.Asteroids = {};
}

var PowerUp = Asteroids.PowerUp = function (pos) {
  Asteroids.MovingObject.call(this, pos.copy(), Asteroids.PowerUp.ATTRS);
  this.timer = new Asteroids.Util.Timer(this.time);
  this.guidance = new Asteroids.Guidance();
};

Asteroids.Util.inherits(PowerUp, Asteroids.MovingObject);

PowerUp.prototype.draw = function (ctx) {
  var file = Asteroids[this.file];
  ctx.drawImage(file, this.pos.x - 10, this.pos.y - 10, 20, 20);
};

PowerUp.prototype.move = function () {
  this.timer.tick();
  this.remove = this.timer.off();
};

PowerUp.prototype.handleCollision = function (ship) {
  this.grantPower(ship);
  this.remove = true;
};

PowerUp.prototype.grantPower = function (ship) {
  ship[this.func]();
};

["Health", "Spread", "Guided"].forEach(function (attr) {
  var Attr = Asteroids[attr] = function (pos) {
    Asteroids.PowerUp.call(this, pos);
  };

  Asteroids.Util.inherits(Attr, PowerUp);

  Attr.prototype.func = "level" + attr;
  Attr.prototype.file = attr.toUpperCase() + "_FILE";
});
})();
