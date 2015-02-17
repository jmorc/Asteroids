(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Util = Asteroids.Util = function() {};
  
  Util.inherits = function(child, parent) {
    var Surrogate = function() {};
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
  };

  Util.randomVec = function(leng) {
    var dx = (Math.random() * 2 - 1) * leng;
    var dy = (Math.random() * 2 - 1) * leng;
    return [dx, dy];
  } 
  
})();