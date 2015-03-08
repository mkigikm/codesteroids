;(function () {
//must be loaded last
Asteroids.Game.DIM_X     = 1600;
Asteroids.Game.DIM_Y     = 1200;
Asteroids.Game.FPS       = 60;
Asteroids.Game.NUM_LINES = 8;

Asteroids.Game.KEY_WORDS = [
  "arguments","break","case","catch","continue","debugger","default","delete",  "else","eval","false","finally","function","if","in","instanceof","let","new",
  "null","return","switch","this","throw","throws","true","try","typeof","var",
  "void","with"
];

Asteroids.Game.LOOPS = [
  "while", "for", "do{}while"
];

Asteroids.Game.ERRORS = [
  "TypeError", "SyntaxError"
];

Asteroids.PARTY_HAT = new Image();
Asteroids.PARTY_HAT.src = 'assests/partyhat.gif';

Asteroids.HEALTH_FILE = new Image();
Asteroids.HEALTH_FILE.src = 'assests/health-powerup.png';

Asteroids.GUIDED_FILE = new Image();
Asteroids.GUIDED_FILE.src = 'assests/guided-powerup.png';

Asteroids.SPREAD_FILE = new Image();
Asteroids.SPREAD_FILE.src = 'assests/spread-powerup.png';
})();
