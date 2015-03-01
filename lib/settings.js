;(function () {
//must be loaded last
Asteroids.Char.DEFAULTS = {
  color: 'green',
  font:  'bold 20px Arial',
  r:     5,
  speed: 2,
  mass:  2
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
  maxDistance: 500
};

Asteroids.Game.DIM_X = 800;
Asteroids.Game.DIM_Y = 800;
Asteroids.Game.FPS   =  60;
Asteroids.Game.NUM_LINES = 8;
Asteroids.Game.KEY_WORDS = [
  "abstract","arguments","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete","do","double","else","enum","eval","export","extends","false","final","finally","float",
  "for","function","goto","if","implements","import","in","instanceof","int","interface","let","long","native","new","null","package","private","protected","public","return","short","static","super","switch","synchronized",
  "this","throw","throws","transient","true","try","typeof","var","void","volatile","while","with","yield"
];
Asteroids.Game.ERROR_WORDS = [
  "TypeError", "SyntaxError"
];

Asteroids.Ship.COLOR           = "yellow";
Asteroids.Ship.INV_COLOR       = "white";
Asteroids.Ship.RADIUS          = 10;
Asteroids.Ship.MAX_SPEED       = 3;
Asteroids.Ship.BULLET_COOLDOWN = 20;
Asteroids.Ship.INV_COOLDOWN    = 120;
Asteroids.Ship.ACCEL           = 0.1;
Asteroids.Ship.DECEL           = 0.1;
Asteroids.Ship.DRAG            = 0.01;
Asteroids.Ship.ROTATION        = Math.PI / 50;
})();
