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
    var dx = Math.random() * leng;
    var dy = Math.random() * leng;
    return [dx, dy];
  } 
  
})();