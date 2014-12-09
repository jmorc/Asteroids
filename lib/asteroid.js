(function() {
  
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var COLOR = "#ccddff";
  var RADIUS = 10;
  
  
  var Asteroid = Asteroids.Asteroid = function(attr) {
    this.color = COLOR,
    this.radius = RADIUS,
    Asteroids.MovingObject.call(this,  { pos: attr["pos"], 
                                         vel: Asteroids.Util.randomVec(2), 
                                         radius: this.radius, 
                                         color: this.color,
                                         game: attr["game"] });                         
    };
    
    Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);
    
    Asteroid.prototype.collideWith = function(otherObject) {
      if (otherObject.instanceOf("Ship")) { 
        if (this.isCollidedWith(otherObject)) {
          otherObject.relocate();
        }
      }
    };
})();