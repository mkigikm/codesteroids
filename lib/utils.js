(function () {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  }

  Asteroids.Util = {};

  Asteroids.Util.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function () {};

    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Asteroids.Util.randomVec = function (d) {
    var x = Math.random() * d * d;
    var y = Math.sqrt(d * d - x * x);

    x *= Math.random() < 0.5 ? -1 : 1;
    y *= Math.random() < 0.5 ? -1 : 1;
    return [x, y];
  };

  Asteroids.Util.vecAdd = function (vec0, vec1, mag) {
    mag = mag || 1;

    vec0[0] += mag * vec1[0];
    vec0[1] += mag * vec1[1];
    return vec0;
  };

  Asteroids.Util.distance = function (pos0, pos1) {
    var dx = pos0[0] - pos1[0],
        dy = pos0[1] - pos1[1];

    return Math.sqrt(dx*dx + dy*dy);
  };

  Asteroids.Util.normVector = function (vec) {
    var d = Asteroids.Util.distance([0, 0], vec);
    vec = vec.slice();
    vec[0] /= d;
    vec[1] /= d;

    return vec;
  };

  Asteroids.Util.vecRot = function (vec, theta) {
    var r0 = vec[0]*Math.cos(theta) - vec[1]*Math.sin(theta);
    var r1 = vec[0]*Math.sin(theta) + vec[1]*Math.cos(theta);

    vec[0] = r0;
    vec[1] = r1;

    return vec;
  };

  Asteroids.Util.vecMult = function (mag, vec) {
    vec[0] *= mag;
    vec[1] *= mag;

    return vec;
  };
})();
