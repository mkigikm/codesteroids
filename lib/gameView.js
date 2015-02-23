(function () {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;

    this.bindKeyHandlers();
  };

  GameView.prototype.start = function () {
    setInterval(function() {
      this.game.step();
      this.game.draw(this.ctx);
    }.bind(this), 20);

    setInterval(function () {
      this.game.handleInputs();
    }.bind(this), 100 / 6);
  };

  GameView.prototype.bindKeyHandlers = function () {
  //   key('w, up', function () {
  //     this.game.ship.power([0, -1]);
  //   }.bind(this));
  //
  //   key('s, down', function () {
  //     this.game.ship.power([0, 1]);
  //   }.bind(this));
  //
  //   key('a, left', function () {
  //     this.game.ship.rotate(Math.PI/6);
  //   }.bind(this));
  //
  //   key('d, right', function () {
  //     this.game.ship.rotate(-Math.PI/6);
  //   }.bind(this));
  //
  //   key('space', function () {
  //     var bullet = this.game.ship.fireBullet();
  //     this.game.addBullet(bullet);
  //   }.bind(this));
  //
  //   key('up+left', function () {
  //     this.game.ship.power([0, -1]);
  //     this.game.ship.rotate(Math.PI/6);
  //   }.bind(this));
  //
  //   key('up+right', function () {
  //     this.game.ship.power([0, -1]);
  //     this.game.ship.rotate(-Math.PI/6);
  //   }.bind(this));
  //
  //   key('down+right', function () {
  //     this.game.ship.power([0, -1]);
  //     this.game.ship.rotate(-Math.PI/6);
  //   }.bind(this));
  };

})();
