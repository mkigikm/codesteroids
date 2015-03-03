;(function () {
//must be loaded last
Asteroids.Char.ATTRS = {
  color:    'green',
  font:     'bold 20px Arial',
  r:        5,
  mass:     2,
  speed:    2
};
Asteroids.Char.LIMITS = {
  maxSpeed:  2,
  minSpeed:  2,
  maxRotate: (Math.PI / 10),
  dampen:    0.1,
  drag:      0
};
Asteroids.Char.LINE_SPACE = 3;

Asteroids.RotChar.ATTRS = _.extend(
  {spinAngle: (Math.PI / 50)}, Asteroids.Char.ATTRS
);

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
  maxSpeed:  100,
  minSpeed:  0,
  maxRotate: (Math.PI / 10),
  dampen:    0,
  drag:      0
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
  maxSpeed:  0,
  minSpeed:  0,
  maxRotate: 0,
  dampen:    0,
  drag:      0
};

Asteroids.Game.DIM_X     = 1200;
Asteroids.Game.DIM_Y     = 900;
Asteroids.Game.FPS       = 60;
Asteroids.Game.NUM_LINES = 8;
Asteroids.Game.KEY_WORDS = [
  "abstract","arguments","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete","do","double","else","enum","eval","export","extends","false","final","finally","float",
  "for","function","goto","if","implements","import","in","instanceof","int","interface","let","long","native","new","null","package","private","protected","public","return","short","static","super","switch","synchronized",
  "this","throw","throws","transient","true","try","typeof","var","void","volatile","while","with","yield"
];
Asteroids.Game.ERROR_WORDS = [
  "TypeError", "SyntaxError"
];

Asteroids.Ship.ATTRS = {
  color:          "yellow",
  invColor:       "white",
  r:              10,
  bulletCooldown: 30,
  invCooldown:    120,
  accel:          0.1,
  decel:          -0.1
};
Asteroids.Ship.LIMITS = {
  maxSpeed:  3,
  minSpeed:  0,
  maxRotate: Math.PI / 50,
  dampen:    0.1,
  drag:      0.01
};
})();
