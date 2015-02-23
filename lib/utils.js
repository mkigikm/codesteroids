(function () {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  }

  Asteroids.Util.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function () {};

    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Asteroids.Util.randomVec = function (length) {
    var vec = [Math.rand() * length*length, ];
    vec[1] = length*length-vec[0];

    return vec;
  };

  Asteroids.Util.vecAdd = function (vec0, vec1) {
    vec0[0] += vec1[0];
    vec0[1] += vec1[1];
  };
})();
