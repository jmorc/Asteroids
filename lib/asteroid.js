(function() {
  
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var COLOR = "#ccddff";
  var RADIUS = 10;
  
  var Asteroid = Asteroids.Asteroid = function(attr) {
    this.color = COLOR,
    this.radius = RADIUS,
    this.rotational_vel = Math.random(2) - 1,
    this.rotational_pos = 0; 
    Asteroids.MovingObject.call(this,  { pos: attr["pos"], 
                                         vel: Asteroids.Util.randomVec(2), 
                                         radius: this.radius, 
                                         color: this.color,
                                         game: attr["game"] });                         
    };
    
    Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);
    
    Asteroid.prototype.collideWith = function(otherObject) {
      if (otherObject instanceof Asteroids.Ship) {
        this.game.scoreboard.lives -= 1;
        otherObject.relocate();
      } else if (otherObject instanceof Asteroids.Bullet) {
        this.game.remove(this);
        this.game.remove(otherObject);
        this.game.scoreboard.points += 10;
      } 
    };
    
    Asteroid.prototype.isRotatable = true;
  
    Asteroid.prototype.draw = function (ctx) {
      ctx.save();  
      ctx.translate(this.pos[0], this.pos[1])

      ctx.rotate(this.rotational_pos);
      ctx.drawImage(Asteroids.asteroid_img, -90, -90, 180, 180);
      ctx.restore();
  }

})();