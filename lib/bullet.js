(function(){

  if ( typeof Asteroids === 'undefined' ) {
	window.Asteroids = {};
  }

  COLOR = "#ccffcc";
  RADIUS = 5;

  var Bullet = Asteroids.Bullet = function(attr) {
      this.color = COLOR,
      this.radius = RADIUS,
      this.pos = attr["pos"],
      Asteroids.MovingObject.call(this,  { pos: attr["pos"], 
                                           vel: attr["vel"], 
                                           radius: this.radius, 
                                           color: this.color,
                                           game: attr["game"] });                         
   }; 
    
  
  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
          this.game.remove(otherObject);
          this.game.remove(this);
        }
  };

  // Bullet.prototype.draw = function() { console.log('drawing bullet')};

 })();