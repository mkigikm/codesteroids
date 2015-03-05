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
})();
