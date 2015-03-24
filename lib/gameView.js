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
};

GameView.prototype.start = function () {
  setInterval(function() {
    this.game.handleInputs();
    this.game.step();
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
    this.drawHud(this.game.ship);

    this.ctx.restore();
    this.drawRealHud(this.game.ship);
  }.bind(this), 1000 / Asteroids.Game.FPS);
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

GameView.prototype.drawRealHud = function (ship) {
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

GameView.prototype.drawHud = function (ship) {
  var enemiesLeft = this.game.chars.length;

  this.ctx.save();
  this.ctx.translate(ship.pos.x, ship.pos.y);

  this.ctx.font = Asteroids.Char.ATTRS.font;

  // this.ctx.save();
  // this.ctx.translate(this.width / 2 - 175, -this.height / 2 + 30);
  // this.ctx.fillStyle = '#000';
  // this.ctx.fillRect(-10, -25, 170, 130);
  // this.ctx.fillStyle = '#f00';
  // this.ctx.fillText('Health: ' + ship.health.value, 0, 0);
  // this.ctx.fillText('Spread: ' + ship.spread.value, 0, 25);
  // this.ctx.fillText('Guided: ' + ship.guided.value, 0, 50);
  // this.ctx.fillText('Ten Count: ' + ((600 - ship.tenCountTimer.value) / 60 | 0), 0 , 75);
  // this.ctx.fillText('Chars left: ' + enemiesLeft, 0, 100);
  // this.ctx.restore();

  if (this.game.victory) {
    this.ctx.fillStyle = '#00f';
    this.ctx.font = 'bold 40px Arial';
    this.ctx.fillText('DEBUGGED', -114, -20);
    this.ctx.fillText("press 'r' to restart", -170, 50);
    this.ctx.strokeStyle = "#000";
    this.ctx.strokeText('DEBUGGED', -114, -20);
    this.ctx.strokeText("press 'r' to restart", -170, 50);
  }

  if (this.game.paused) {
    this.ctx.translate(450, -300);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(-820, 100, 800, 375);
    this.ctx.fillStyle = '#00f';
    this.ctx.font = 'bold 40px Arial';
    this.ctx.fillText("Your javascript engine is out of control!", -800, 150);
    this.ctx.fillText("Destroy the rogue keywords before they", -800, 200);
    this.ctx.fillText("destroy you.", -800, 250);
    this.ctx.fillText("z: guided shot,     for a power up", -800, 300);
    this.ctx.drawImage(Asteroids.GUIDED_FILE, -505, 275, 35, 35);
    this.ctx.fillText("x: spread shot,     for a power up", -800, 350);
    this.ctx.drawImage(Asteroids.SPREAD_FILE, -505, 320, 35, 35);
    this.ctx.fillText("p: pauses (and starts)", -800, 400);
    this.ctx.fillText("arrow keys move", -800, 450);
    this.ctx.restore();
  }

  if (this.game.dead) {
    this.ctx.fillStyle = '#00f';
    this.ctx.font = 'bold 40px Arial';
    this.ctx.fillText('The bugs have won.', -170, -20);
    this.ctx.fillText("press 'r' to restart", -170, 50);
    this.ctx.strokeStyle = "#000";
    this.ctx.strokeText('The bugs have won.', -170, -20);
    this.ctx.strokeText("press 'r' to restart", -170, 50);
  }

  this.ctx.restore();
};

var shakeAngle = function (t) {
  return Math.sin(t / (3 + t / 60))*(120-t)/120*Math.PI/10;
};
})();
