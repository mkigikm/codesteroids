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

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(-20000, -20000, 28000, 28000);
    this.ctx.fillStyle = 'black';
    this.ctx.stroke();
    this.ctx.save();
    this.ctx.translate(400 - this.game.ship.pos.x, 400 - this.game.ship.pos.y);
    this.ctx.fillRect(0, 0, 800, 800)
    this.ctx.strokeStyle = 'red';
    this.ctx.strokeRect(0, 0, 800, 800);
    this.game.draw(this.ctx);
    console.log(this.game.ship.pos.toString())
    this.ctx.restore();
  }.bind(this), 1000 / Asteroids.Game.FPS);
}
})();
