;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

var GameView = Asteroids.GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.start = function () {
  setInterval(function() {
    this.game.handleInputs();
    this.game.step();
    this.ctx.save();
    this.ctx.translate(400 - this.game.ship.pos.x, 300 - this.game.ship.pos.y);
    this.drawBackground();
    this.game.draw(this.ctx);


    console.log(this.game.ship.pos.toString())
    this.ctx.restore();
  }.bind(this), 1000 / Asteroids.Game.FPS);
}

GameView.prototype.drawBackground = function () {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(-20000, -20000, 28000, 28000);
    this.ctx.fillStyle = 'orange';
    //left
    this.ctx.fillRect(0, 0, 50, Asteroids.Game.DIM_Y)
    //right
    this.ctx.fillRect(Asteroids.Game.DIM_X-50, 0, 50, Asteroids.Game.DIM_Y)
    //top
    this.ctx.fillRect(0, 0, Asteroids.Game.DIM_X, 50)
    //bot
    this.ctx.fillRect(0, Asteroids.Game.DIM_Y-50, Asteroids.Game.DIM_X, 50)
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(Asteroids.Game.DIM_X * 0.25, Asteroids.Game.DIM_Y * 0.25, 100, 100)
    this.ctx.fillRect(Asteroids.Game.DIM_X * 0.75, Asteroids.Game.DIM_Y * 0.75, 100, 100)
    this.ctx.fillRect(Asteroids.Game.DIM_X * 0.25, Asteroids.Game.DIM_Y * 0.75, 100, 100)
    this.ctx.fillRect(Asteroids.Game.DIM_X * 0.75, Asteroids.Game.DIM_Y * 0.25, 100, 100)
    this.ctx.fillRect(Asteroids.Game.DIM_X * 0.45, Asteroids.Game.DIM_Y * 0.45, Asteroids.Game.DIM_X * 0.1, Asteroids.Game.DIM_X * 0.1)
};
})();
