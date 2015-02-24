(function () {
  if (typeof(window.Asteroids) === 'undefined') {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (keys) {
    keys.color = Ship.COLOR;
    keys.r     = Ship.RADIUS;
    keys.head  = [0, -1];
    keys.speed = 0;
    this.givePowerUp = false;

    Asteroids.MovingObject.call(this, keys);
  };

  Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

  Ship.COLOR  = "yellow";
  Ship.RADIUS = 5;
  Ship.MAX_SPEED = 3;

  Ship.prototype.relocate = function (pos) {
    this.pos = pos;
    this.speed = 0;
  };

  Ship.prototype.power = function (impulse) {
    this.speed = Math.min(impulse+this.speed, Ship.MAX_SPEED);
    this.speed = Math.max(this.speed, 0);
  };

  Ship.prototype.fireBullet = function () {
    return new Asteroids.Bullet({head: this.head.slice(),
        pos: this.pos.slice()});
  };

  Ship.prototype.rotate = function (theta) {
    Asteroids.Util.rotateVec(this.head, theta);
  };

  Ship.prototype.draw = function (ctx) {
    var top = this.head.slice();
    var right = Asteroids.Util.rotateVec(top.slice(), 120 * 2 * Math.PI / 180);
    var left = Asteroids.Util.rotateVec(top.slice(), -120 * 2 * Math.PI / 180);

    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);

    ctx.beginPath();
    ctx.strokeStyle = 'yellow';
    ctx.fillStyle = 'yellow';
    ctx.moveTo(  top[0] * 10, top[1]   * 10);
    ctx.lineTo(right[0] * 10, right[1] * 10);
    ctx.lineTo(            0,             0);
    ctx.lineTo( left[0] * 10, left[1]  * 10);
    ctx.lineTo(  top[0] * 10, top[1]   * 10);
    ctx.stroke();
    ctx.fill();
    // ctx.lineTo(this.head[0] * 10, this.head[1]*10-20);

    // ctx.lineTo(this.head[0] * 10 - 10, this.head[1]*10-20)
    // ctx.lineTo(0, 0);
    // ctx.lineTo(this.head[0] * 50 + 10, this.head[1] * 50);
    // // ctx.lineTo(this.head[0] * 50, this.head)
    // ctx.lineTo(0, 10);
    // ctx.lineTo(50, 0);
    // ctx.lineTo(0, -10);
    // ctx.stroke();
    // ctx.lineTo(-10, -10);
    // ctx.lineTo(-5, 0);
    // ctx.lineTo(-10, 10);
    // ctx.lineTo(10, 0);
    // ctx.fillStyle = this.color;
    // ctx.fill();
    // ctx.beginPath();
    // ctx.strokeStyle = 'blue';
    // ctx.lineWidth = 5;
    // ctx.moveTo(this.head[0] * 50, this.head[1]*50);
    // ctx.lineTo(-this.head[0] * 50, -this.head[1]*50);
    // ctx.moveTo(-this.head[0] * 50, this.head[1] * 50);
    // ctx.lineTo(this.head[0] * 50, -this.head[1] * 50);
    // ctx.stroke();
    ctx.restore();

  }
})();
