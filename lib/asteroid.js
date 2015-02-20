(function() {
  
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Asteroid = Asteroids.Asteroid = function(attr) {
    this.assignSize();
    this.rotational_vel = Math.random(2) - 1,
    this.rotational_pos = 0; 
    Asteroids.MovingObject.call(this,  { pos: attr["pos"], 
                                         vel: Asteroids.Util.randomVec(2), 
                                         radius: this.radius, 
                                         color: this.color,
                                         game: attr["game"] }); 
    };
    
    Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);
    
    Asteroid.prototype.assignSize = function(){
      var randomNum = Math.random();
      if ( randomNum > 0.85 ) {
        this.size = "big";
        this.radius = 90;
      } else if ( randomNum > 0.5 ) {
        this.size = "medium";
        this.radius = 20;
      } else {
        this.size = "small"
        this.radius = 10;
      }
    }

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
      if ( this.size === "big" ) {
        ctx.drawImage(Asteroids.big_asteroid_img, -90, -90, 180, 180);
      } else if ( this.size === "medium" ) {
        ctx.drawImage(Asteroids.medium_asteroid_img, -40, -40, 80, 80);
      } else {
        ctx.drawImage(Asteroids.small_asteroid_img, -20, -20, 40, 40);
      }
      ctx.restore();
    }

})();