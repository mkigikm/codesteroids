;(function () {
Asteroids.Char.ATTRS = {
  color: 'green',
  font:  'bold 20px Arial',
  r:     5,
  mass:  2,
  speed: 1
};

Asteroids.Char.LIMITS = {
  speed:    {min: 0, max: 2.5},
  rotation: (Math.PI / 10),
  impulse:  {min: -0.05, max: 0.05},
  drag:     0.1
};

Asteroids.RotChar.ATTRS = _.extend(
  {spinAngle: (Math.PI / 50)}, Asteroids.Char.ATTRS
);

Asteroids.ProjectileChar.ATTRS = _.extend(
  {}, Asteroids.Char.ATTRS, {speed:4, maxDistance: 500}
);

Asteroids.ProjectileChar.LIMITS = {
  speed:    {min: 0, max: 5},
  rotation: 0,
  impulse:  {min: 0, max: 0},
  drag:     0
};

Asteroids.Char.LINE_SPACE = 3;
})();
