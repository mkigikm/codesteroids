;(function () {
//must be loaded last
Asteroids.Game.DIM_X     = 1600;
Asteroids.Game.DIM_Y     = 1200;
Asteroids.Game.FPS       = 60;
Asteroids.Game.NUM_LINES = 8;
// Asteroids.Game.KEY_WORDS = [
//   "abstract","arguments","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete","do","double","else","enum","eval","export","extends","false","final","finally","float",
//   "for","function","goto","if","implements","import","in","instanceof","int","interface","let","long","native","new","null","package","private","protected","public","return","short","static","super","switch","synchronized",
//   "this","throw","throws","transient","true","try","typeof","var","void","volatile","while","with","yield"
// ];
Asteroids.Game.KEY_WORDS = [
  "arguments","break","case","catch","continue","debugger","default","delete",
  "do","else","eval","export","extends","false","final","finally","this",
  "throw","throws","true","try","typeof","var","void","while","with","yield"
];

Asteroids.Game.LOOPS = [
  "while", "for", "do{}while"
];

Asteroids.Game.ERRORS = [
  "TypeError", "SyntaxError"
];

Asteroids.PARTY_HAT = new Image();
Asteroids.PARTY_HAT.src = 'assests/partyhat.gif';
})();
