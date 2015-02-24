(function () {

  //must be loaded last

  Asteroids.Asteroid.COLOR = 'red';
  Asteroids.Asteroid.RADIUS = 5;



  Asteroids.Bullet.COLOR  = 'white';
  Asteroids.Bullet.RADIUS = 3;
  Asteroids.Bullet.SPEED  = 6;


  Asteroids.Game.DIM_X = 800;
  Asteroids.Game.DIM_Y = 800;
  Asteroids.Game.NUM_LINES = 10;
  Asteroids.Game.BULLET_COOLDOWN = 20;
  Asteroids.Game.KEY_WORDS = [
    "abstract","arguments","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete","do","double","else","enum","eval","export","extends","false","final","finally","float",
    "for","function","goto","if","implements","import","in","instanceof","int","interface","let","long","native","new","null","package","private","protected","public","return","short","static","super","switch","synchronized",
    "this","throw","throws","transient","true","try","typeof","var","void","volatile","while","with","yield"
  ];

  Asteroids.Ship.COLOR     = "yellow";
  Asteroids.Ship.RADIUS    = 10;
  Asteroids.Ship.MAX_SPEED = 3;
})();
