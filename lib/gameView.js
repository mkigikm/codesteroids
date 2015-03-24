;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

var GameView = Asteroids.GameView = function(game, ctx, width, height) {
  this.game   = game;
  this.ctx    = ctx;
  this.bg     = new Image();
  this.bg.src = 'assests/circuit_board_blue.jpg';
  this.width  = width;
  this.height = height;
  this.started = false;
};

GameView.prototype.start = function () {
  this.started = true;
  this.game.paused = false;
};

GameView.prototype.run = function () {
  setInterval(function() {
    this.game.handleInputs();
    this.game.step();
    this.render();
  }.bind(this), 1000 / Asteroids.Game.FPS);
};

GameView.prototype.render = function () {
  this.ctx.save();
  this.ctx.translate(Asteroids.Game.DIM_X / 2, Asteroids.Game.DIM_Y / 2);
  this.ctx.rotate(shakeAngle(120-this.game.ship.invinsibleTimer.value));
  this.ctx.translate(-Asteroids.Game.DIM_X / 2, -Asteroids.Game.DIM_Y / 2);
  this.ctx.translate(
    this.centerX(this.game.ship.pos.x),
    this.centerY(this.game.ship.pos.y)
  );
  this.drawBackground();
  this.game.draw(this.ctx);
  this.ctx.restore();

  this.drawHud(this.game.ship);
  this.drawMenu();
};

GameView.prototype.centerX = function (x) {
  if (x < this.width / 2) return 0;
  if (x > Asteroids.Game.DIM_X - this.width / 2)
    return -(Asteroids.Game.DIM_X - this.width);
  return this.width / 2 - x;
};

GameView.prototype.centerY = function (y) {
  if (y < this.height / 2 - 50) return 50;
  if (y > Asteroids.Game.DIM_Y - this.height / 2)
    return -(Asteroids.Game.DIM_Y - this.height);
  return this.height / 2 - y;
};

GameView.prototype.drawBackground = function () {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(
      -this.width,
      -this.height,
      Asteroids.Game.DIM_X * 3,
      Asteroids.Game.DIM_Y * 3
    );

    this.ctx.fillStyle = '#2B3E87';
    this.ctx.fillRect(0, 0, Asteroids.Game.DIM_X, Asteroids.Game.DIM_Y);
    this.ctx.drawImage(
      this.bg,
      0,
      0,
      Asteroids.Game.DIM_X,
      Asteroids.Game.DIM_Y
    );
};

GameView.prototype.drawHud = function (ship) {
  var enemiesLeft = this.game.chars.length;
  this.ctx.save();
  this.ctx.fillStyle = '#000';
  this.ctx.fillRect(0, 0, this.width, 50);
  this.ctx.translate(300, 0);
  this.ctx.drawImage(Asteroids.HEALTH_FILE, 3, 8, 35, 35);
  this.ctx.fillStyle = '#999';
  this.ctx.font = 'bold 24px Arial'
  this.ctx.fillText(ship.health.value + ', z: guided shot (level ' +
      ship.guided.value + '), x: spread shot (level ' + ship.spread.value +
      '), chars left: ' + enemiesLeft, 50, 35);
  this.ctx.restore();
};

GameView.prototype.drawMenu = function () {
  var enemiesLeft = this.game.chars.length;

  if (this.game.victory) {
    this.ctx.save();
    this.ctx.translate(this.width / 2 - 200, this.height / 2 - 110);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillRect(0, 0, 380, 110);
    this.ctx.fillStyle = '#00f';
    this.ctx.font = 'bold 40px Arial';
    this.ctx.fillText('DEBUGGED', 20, 40);
    this.ctx.fillText("press 'r' to restart", 20, 90);
  }

  if (this.game.dead) {
    this.ctx.save();
    this.ctx.translate(this.width / 2 - 208, this.height / 2 - 110);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillRect(0, 0, 416, 110);
    this.ctx.fillStyle = '#00f';
    this.ctx.font = 'bold 40px Arial';
    this.ctx.fillText('The bugs have won.', 20, 40);
    this.ctx.fillText("press 'r' to restart", 20, 90);
    this.ctx.restore();
  }

  if (!this.started) {
    this.ctx.save();
    this.ctx.translate(this.width / 2 - 370, this.height / 2 - 250);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillRect(0, 0, 800, 400);
    this.ctx.fillStyle = '#00f';
    this.ctx.font = 'bold 40px Arial';
    this.ctx.fillText("Your javascript engine is out of control!", 20, 40);
    this.ctx.fillText("Destroy the rogue keywords before they", 20, 90);
    this.ctx.fillText("destroy you.", 20, 140);
    this.ctx.fillText("z: guided shot,     for a power up", 20, 190);
    this.ctx.drawImage(Asteroids.GUIDED_FILE, 310, 160, 35, 35);
    this.ctx.fillText("x: spread shot,     for a power up", 20, 240);
    this.ctx.drawImage(Asteroids.SPREAD_FILE, 315, 210, 35, 35);
    this.ctx.fillText("p: pause", 20, 290);
    this.ctx.fillText("arrow keys move", 20, 340);
    this.ctx.fillStyle = '#f00';
    this.ctx.fillText("Click to start", 240, 390);
    this.ctx.restore();
  }

  this.ctx.restore();
};

var shakeAngle = function (t) {
  return Math.sin(t / (3 + t / 60))*(120-t)/120*Math.PI/10;
};
})();
