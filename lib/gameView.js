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
    this.ctx.rotate(shakeAngle(120-this.game.ship.invinsibleTimer.value));
    this.ctx.translate(-800, -450);
    // this.ctx.translate(-this.game.ship.pos.x,-this.game.ship.pos.y);
    this.ctx.translate(
      1024 / 2 - this.game.ship.pos.x,
      768 / 2 - this.game.ship.pos.y
    );
    this.drawBackground();
    this.game.draw(this.ctx);
    this.drawHud(this.game.ship);

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

GameView.prototype.drawHud = function (ship) {
  var enemiesLeft = this.game.chars.length;

  this.ctx.save();
  this.ctx.translate(ship.pos.x + 375, ship.pos.y - 350);

  this.ctx.fillStyle = 'red';
  this.ctx.font = Asteroids.Char.ATTRS.font;

  this.ctx.fillText('Health: ' + ship.health.value, 0, 0);
  this.ctx.fillText('Spread: ' + ship.spread.value, 0, 25);
  this.ctx.fillText('Guided: ' + ship.guided.value, 0, 50);
  this.ctx.fillText('Ten Count: ' + ((600 - ship.tenCountTimer.value) / 60 | 0), 0 , 75);
  this.ctx.fillText('Chars left: ' + enemiesLeft, 0, 100);

  if (enemiesLeft === 0) {
    this.ctx.font = 'bold 40px Arial';
    this.ctx.translate(-375, 350);
    this.ctx.fillText('DEBUGGED', -114, 5);
  }

  this.ctx.restore();
};

var shakeAngle = function (t) {
  // return Math.PI / 200 * (120 - t) / 10 *
  //     Math.sin((t - Math.PI / 2) * 10 * t);
  return Math.sin(t / (3 + t / 60))*(120-t)/120*Math.PI/5;
};
})();
