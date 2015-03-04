;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}
if (typeof Asteroids.AI === "undefined") {
  Asteroids.AI = {};
}

var Wanderer = Asteroids.AI.Wanderer = {};

Wanderer.update = function (state, pos, goal, guidance, shipPos) {
  var goalDist = pos.dist(goal),
      shipDist = pos.dist(shipPos);

  state = state || "choosing";
  switch (state) {
    case "choosing":
      goal.set(Asteroids.Game.randomPos());
      return "seeking";
    case "seeking":
      if (shipDist < 300) return "attacking";
      if (goalDist < 10)  return "choosing";

      guidance.seek(pos, goal);
      guidance.setSpeed(2);
      return "seeking"
    case "attacking":
      if (shipDist > 400) return "choosing";

      guidance.seek(pos, shipPos);
      guidance.setSpeed(3);
      return "attacking";
  };
};

Wanderer.idealSpeed = function (cur) {
  var dx = 100 - 10,
      dy = 2 - 1;

  return 1 + (cur - 10) * dy / dx;
};
})();
