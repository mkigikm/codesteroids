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
    this.ctx.translate(400 - this.game.ship.pos.x, 300 - this.game.ship.pos.y);
    this.ctx.fillRect(0, 0, 1200, 4800);
    this.game.draw(this.ctx);


    this.ctx.fillStyle = 'green';
    this.ctx.font      = 'bold 100px Arial';
    for (var y = 0; y < 4800; y += 100) {
      this.ctx.fillText("{", 0, y);
      this.ctx.fillText("}", 1200-45, y);
    }

    for (var y = 0; y < 4800; y+= 600) {
      this.ctx.fillText("/////////////", 100, y);
      this.ctx.fillText("/////////////", 1000, y);

      this.ctx.strokeStyle = 'red';
      this.ctx.strokeRect(100, y, 600, 100);
    }
    console.log(this.game.ship.pos.toString())
    this.ctx.restore();
  }.bind(this), 1000 / Asteroids.Game.FPS);
}
})();
