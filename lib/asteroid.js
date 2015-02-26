(function() {
  
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Asteroid = Asteroids.Asteroid = function(attr) {
    if ( attr["size"] ) {
      this.size = attr["size"];
    } else {
      this.size = this.assignSize();
    }

    if ( this.size === 'big' ) {
        this.radius = 90;
    } else if ( this.size === 'medium' ) {
        this.radius = 40;
    } else {
        this.radius = 20;
    }

    this.rotational_vel = Math.random(2) - 1,
    this.rotational_pos = 0; 
    Asteroids.MovingObject.call(this,  { pos: attr["pos"], 
                                         vel: Asteroids.Util.randomVec(2), 
                                         radius: this.radius, 
                                         game: attr["game"] }); 
    };
    
    Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);
    
    Asteroid.prototype.assignSize = function(){
      var randomNum = Math.random();
      if ( randomNum > 0.85 ) {
        return "big";
      } else if ( randomNum > 0.5 ) {
        return "medium";
      } else {
        return "small"
      }
    }

    Asteroid.prototype.collideWith = function(otherObject) {
      if (otherObject instanceof Asteroids.Ship) {
        this.game.scoreboard.lives -= 1;
        otherObject.relocate();
        this.game.play_multi_sound('ship_death');
      } else if (otherObject instanceof Asteroids.Bullet) {
        this.explode();
        this.game.remove(this);
        this.game.remove(otherObject);
        this.game.play_multi_sound('bullet_hit');

        if ( this.size === 'big' ) {
          for (var i = 0; i < 3; i++) {
            this.game.insertAsteroid({ pos: this.pos.slice(0), 
                                       size: "medium" })
          };   
        } else if ( this.size === 'medium' ) {
          for (var i = 0; i < 3; i++) {
            this.game.insertAsteroid({ pos: this.pos.slice(0), 
                                       size: "small" })
          };
        }
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

    Asteroid.prototype.explode = function() {
      console.log("explosion")
      var attr = { pos: this.pos, 
                   game: this.game,
                   rotational_vel: this.rotational_vel
                 };

      var explosion = new Asteroids.Explosion(attr);
      explosion.game.explosions.push(explosion);
    }
})();