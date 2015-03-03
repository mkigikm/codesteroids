;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}

var AI = Asteroids.AI = {}

AI.Wanderer.update = function (state, pos, goal, guidance, shipPos) {
  var goalDist = pos.dist(goal),
      shipDist = pos.dist(ship);

  switch (state) {
    case "choosing":
      goal.set(Asteroids.Game.randomPos());
      return "seeking";
    case "seeking":
      if (shipDist < 100) return "charging";
      if (goalDist < 10)  return "choosing";

      guidance.seek(pos, goal);
      guidance.setSpeed(AI.Wanderer.idealSpeed(goalDist));
      return "seeking"
    case "attacking":
      if (shipDist > 200) return "choosing";

      guidance.seek(pos, shipPos);
      guidance.setSpeed(3);
      return "attacking";
  };
};

AI.Wanderer.idealSpeed = function () {
  var dx = 100 - 10,
      dy = 2 - 0;

  return min + (cur - start) * dy / dx;
};
})();
