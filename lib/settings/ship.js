;(function () {
Asteroids.Ship.ATTRS = {
  color:          "yellow",
  invColor:       "white",
  r:              10,
  bulletCooldown: 30,
  invCooldown:    120,
  accel:          0.1,
  decel:          -0.1,
  spreadLevel:    2,
  guidedLevel:    1
};

Asteroids.Ship.LIMITS = {
  speed:    {min: 0, max: 5},
  rotation: Math.PI / 35,
  drag:     0.01,
  impulse:  {min: -0.1, max: 0.1}
};

Asteroids.Ship.SPREAD = [
  [0],
  [-Math.PI / 40, 0, Math.PI / 40],
  [-Math.PI / 20, -Math.PI / 40, 0, Math.PI / 40, Math.PI / 20]
];

Asteroids.Ship.GUIDED = [

];
})();
