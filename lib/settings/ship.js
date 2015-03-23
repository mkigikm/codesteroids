;(function () {
Asteroids.Ship.ATTRS = {
  color:          "yellow",
  invColor:       "white",
  r:              10,
  bulletCooldown: 30,
  invCooldown:    120,
  accel:          0.1,
  decel:          -0.1,
  tenCountMax:    600,
  startHealth:    3,
  maxHealth:      5,
  maxGuided:      2,
  maxSpread:      2,
  partyTimeout:   18000
};

Asteroids.Ship.LIMITS = {
  speed:    {min: 0, max: 5.5},
  rotation: Math.PI / 35,
  drag:     0.01,
  impulse:  {min: -0.1, max: 0.1}
};

Asteroids.Ship.SPREAD = [
  [-Math.PI / 60, Math.PI / 60],
  [-Math.PI / 40, 0, Math.PI / 40],
  [-Math.PI / 20, -Math.PI / 40, 0, Math.PI / 40, Math.PI / 20]
];

Asteroids.PowerUp.ATTRS = {
  r:    10,
  time: 300
}
})();
