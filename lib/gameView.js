;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

var GameView = Asteroids.GameView = function(game, ctx) {
  this.game = game;
  this.ctx  = ctx;
  this.bg   = new Image();
  this.bg.src = 'assests/circuit_board_blue.jpg';
};

GameView.prototype.start = function () {
  setInterval(function() {
    this.game.handleInputs();
    this.game.step();
    this.ctx.save();
    // this.ctx.translate(this.game.ship.pos.x,this.game.ship.pos.y);
    // var f = factor(this.game.ship.invinsibleTimer.value) / 15;
    this.ctx.translate(800, 450);
    // var angle = new Asteroids.Vector({
    //   x: Math.cos(f * Math.PI / 40),
    //   y: Math.sin(f * Math.PI / 40)
    // }).angle();
    // if (angle !== 0) {
    //   console.log(angle * 180 / Math.PI)
    // }
    this.ctx.rotate(shakeAngle(this.game.ship.invinsibleTimer.value));
    this.ctx.translate(-800, -450);
    // this.ctx.translate(-this.game.ship.pos.x,-this.game.ship.pos.y);
    this.ctx.translate(
      1600 / 2 - this.game.ship.pos.x,
      900 / 2 - this.game.ship.pos.y
    );
    this.drawBackground();
    this.game.draw(this.ctx);


    // console.log(this.game.ship.pos.toString())
    this.ctx.restore();
  }.bind(this), 1000 / Asteroids.Game.FPS);
}

GameView.prototype.drawBackground = function () {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(-20000, -20000, 28000, 28000);
    this.ctx.drawImage(this.bg, 0, 0,
      Asteroids.Game.DIM_X, Asteroids.Game.DIM_Y);
};

var shakeAngle = function (t) {
  if (t === 0) return 0;
  return Math.PI / 200 * (120 - t) / 10 *
      Math.sin((t - Math.PI / 2) * 10 * t);
};
})();
