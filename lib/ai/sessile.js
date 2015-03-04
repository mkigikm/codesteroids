;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}
if (typeof Asteroids.AI === "undefined") {
  Asteroids.AI = {};
}

var Sessile = Asteroids.AI.Sessile = {};

Sessile.update = function (state, pos, goal, guidance, shipPos) {
  state = state || "stopping";
  switch (state) {
    case "choosing":
    case "stopping":
      if (guidance.speed === 0) return "attacking";

      guidance.setSpeed(0);
      return "stopping";
    case "attacking":
      return "attacking";
  }
};
})();
