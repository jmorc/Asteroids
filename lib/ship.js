(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var COLOR = "#ccffff";
  var RADIUS = 10;

  var Ship = Asteroids.Ship = function(attr) {
      this.color = COLOR,
      this.radius = RADIUS,
      this.pos = attr["pos"],
      Asteroids.MovingObject.call(this,  { pos: attr["pos"], 
                                           vel: [0, 0], 
                                           radius: this.radius, 
                                           color: this.color,
                                           game: attr["game"] });                         
   }; 
    
  
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);
  
  Ship.prototype.relocate = function() {
    this.pos = Asteroids.Game.randomPosition();
  }
  
})();