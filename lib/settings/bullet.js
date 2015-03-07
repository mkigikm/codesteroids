;(function () {
Asteroids.Bullet.ATTRS = {
  color:       "white",
  r:           3,
  speed:       8,
  mass:        1,
  maxDistance: 500,
  scanR:       100,
  lockR:       200,
  maxBounces:  1,
  displayTarg: true
};
Asteroids.Bullet.LIMITS = {
  speed:    {min: 0, max: 100},
  rotation: (Math.PI / 25),
  impulse:  {min: 0, max: 0},
  drag:     0
};

Asteroids.Explosive.ATTRS = {
  color:    "red",
  r:        2,
  speed:    0,
  mass:     0,
  growth:   0.15,
  time:     30
};
Asteroids.Explosive.LIMITS = {
  speed:    {min: 0, max: 0},
  rotation: 0,
  drag:     0
};
})();
