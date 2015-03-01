;(function () {
//must be loaded last
Asteroids.Char.DEFAULTS = {
  color:    'green',
  font:     'bold 20px Arial',
  r:        5,
  speed:    2,
  mass:     2,
  drag:     0.01,
  minSpeed: 2
};
Asteroids.Char.LINE_SPACE = 3;

Asteroids.RotChar.SPIN_ANGLE = Math.PI / 50;
Asteroids.AttackChar.LINE_DEFAULTS = {
  turnCounter: 20,
  health:      5,
  sign:        -1,
  turnAngle:   Math.PI / 2
};

Asteroids.Bullet.DEFAULTS = {
  color:       "white",
  r:           3,
  speed:       8,
  mass:        1,
  maxDistance: 500,
  drag:        0,
  minSpeed:    0
};

Asteroids.Game.DIM_X     = 800;
Asteroids.Game.DIM_Y     = 800;
Asteroids.Game.FPS       =  60;
Asteroids.Game.NUM_LINES = 8;
Asteroids.Game.KEY_WORDS = [
  "abstract","arguments","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete","do","double","else","enum","eval","export","extends","false","final","finally","float",
  "for","function","goto","if","implements","import","in","instanceof","int","interface","let","long","native","new","null","package","private","protected","public","return","short","static","super","switch","synchronized",
  "this","throw","throws","transient","true","try","typeof","var","void","volatile","while","with","yield"
];
Asteroids.Game.ERROR_WORDS = [
  "TypeError", "SyntaxError"
];

Asteroids.Ship.DEFAULTS = {
  color:             "yellow",
  invColor:          "white",
  r:                 10,
  maxSpeed:          3,
  minSpeed:          0,
  maxBulletCooldown: 10,
  maxInvCooldown:    120,
  accel:             0.1,
  decel:             0.1,
  drag:              0.01,
  rotation:          Math.PI / 50
};
})();
