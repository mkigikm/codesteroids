;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}
if (typeof Asteroids.AI === "undefined") {
  Asteroids.AI = {};
}

var Sentinal = Asteroids.AI.Sentinal = {};

Sentinal.update = function (state, pos, goal, guidance, shipPos) {
  var goalDist = pos.dist(goal),
      shipDist = pos.dist(shipPos);

  state = state || "choosing";
  switch (state) {
    case "choosing":
      goal.set(Asteroids.Game.randomPos());
      return "seeking";
    case "seeking":
      if (goalDist < 100) return "patrolling";

      guidance.seek(pos, goal);
      guidance.setSpeed(2);
      return "seeking"
    case "patrolling":
      if (shipDist < 200) return "attacking";

      guidance.setSpeed(2);
      goalDist > 200 && guidance.head.rot(Math.PI).norm();
      return "patrolling";
    case "attacking":
      if (shipDist > 500 || goalDist > 500) return "choosing";

      guidance.seek(pos, shipPos);
      guidance.setSpeed(3);
      return "attacking";
  };
};
})();
