;(function () {
Asteroids.Char.ATTRS = {
  color: '#090',
  font:  'bold 24px Arial',
  r:     7,
  mass:  2,
  speed: 1
};

Asteroids.Char.LIMITS = {
  speed:    {min: 0, max: 2.5},
  rotation: (Math.PI / 10),
  impulse:  {min: -0.5, max: 0.5},
  drag:     0.05
};

Asteroids.RotChar.ATTRS = _.extend(
  {spinAngle: (Math.PI / 50)}, Asteroids.Char.ATTRS
);

Asteroids.ProjectileChar.ATTRS = _.extend(
  {}, Asteroids.Char.ATTRS, {
    speed:       4,
    maxDistance: 500,
    color:       '#0f0',
    font:        'bold 24px Arial'
  }
);

Asteroids.ProjectileChar.LIMITS = {
  speed:    {min: 0, max: 5},
  rotation: 0,
  impulse:  {min: 0, max: 0},
  drag:     0
};

Asteroids.Char.LINE_SPACE = 3;
})();
