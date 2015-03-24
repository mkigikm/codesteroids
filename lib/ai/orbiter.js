;(function () {
if (typeof(window.Asteroids) === "undefined") {
  window.Asteroids = {};
}
if (typeof Asteroids.AI === "undefined") {
  Asteroids.AI = {};
}

var Orbiter = Asteroids.AI.Orbiter = {};

Orbiter.update = function (state, pos, goal, guidance, shipPos, wordOOB) {
  var goalDist = pos.dist(goal);

  state = state || "choosing";
  switch (state) {
    case "choosing":
      goal.set(Asteroids.Game.randomPos());
      return "seeking";
    case "seeking":
      if (goalDist < 100)  return "orbiting";

      guidance.seek(pos, goal);
      guidance.setSpeed(2);
      return "seeking"
    case "orbiting":
      if (goalDist > 150) return "seeking";

      if (wordOOB) return "choosing";

      guidance.setSpeed(2);
      guidance.head.set(goal.subC(pos));
      guidance.head.rot(Math.PI / 2).norm();
      return "orbiting";
  };
};
})();
