(function () {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (keys) {
    var key

    for (key in keys) {
      this[key] = keys[key];
    }

    this.next = this.next  || null;
    this.prev = this.prev || null;
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

  MovingObject.prototype.link = function (next) {
    this.next      = next;
    this.next.prev = this;
  };

  MovingObject.prototype.break = function () {
    // if we are the head, return the new head
    var newHead = this.prev === null ? this.next : null;

    if (this.prev) {
      this.prev.next = this.next;
    }

    if (this.next) {
      this.next.prev = this.prev;
    }

    this.next = null;
    this.prev = null;

    return newHead;
  };
})();
