(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  
  var DIM_X = 800, DIM_Y = 400, NUM_ASTEROIDS = 6;
  
  var Game = Asteroids.Game = function() {
    this.asteroids = this.addAsteroids(NUM_ASTEROIDS);
    this.bullets = [];
    this.scoreboard = new Asteroids.Scoreboard(5);
    this.ship = new Asteroids.Ship({
                              pos: this.randomPosition(), 
                              game: this
                            });
  }

  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship]).concat(this.bullets);
  }
  
  Game.prototype.addAsteroids = function (num) {
    var asteroids_arr = [];
    for (var i = 0; i < num; i++) {
      var pos = this.randomPosition();
      var asteroid = new Asteroids.Asteroid( { pos: pos, game: this} );
      asteroids_arr.push(asteroid); 
    }
    return asteroids_arr;
  };

  Game.prototype.checkCollisions = function() {
    for (var i = 0; i < this.allObjects().length; i++) {
      for (var j = i + 1; j < this.allObjects().length; j++) {
        this.allObjects()[i].isCollidedWith(this.allObjects()[j]);
      }
    }
  };
  
  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0,  DIM_X, DIM_Y);
    ctx.drawImage(Asteroids.background_img, 0, 0, 800, 400);
    this.allObjects().forEach(function(obj) {
      obj.draw(ctx);
    });

  }

  Game.prototype.isOutOfBounds = function(pos) {
    if ( (pos[0] < 3 || pos[1] < 3) || (pos[0] > DIM_X - 3 || pos[1] > DIM_Y - 3) ) {
      console.log("out of bounds")
      return true;
    }
    return false;
  }

  Game.prototype.isOver = function() {
    if ( this.scoreboard.lives === 0 ) {
      alert("Game Over!  Nice job.")
      location.reload();
    }
  }

  Game.prototype.insertAsteroid = function(attr) {
    var asteroid = new Asteroids.Asteroid( { pos: attr["pos"], 
                                             game: this, 
                                             size: attr["size"]} );
    this.asteroids.push(asteroid); 
  }
  
  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function(obj) {
      obj.move();
    });
  };
  
  Game.prototype.randomPosition = function () {
    var xPos = Math.floor(Math.random() * DIM_X);
    var yPos = Math.floor(Math.random() * DIM_Y);
    return [xPos, yPos]; 
  };

  Game.prototype.remove = function(movingObject) { 
    if (movingObject instanceof Asteroids.Asteroid) {
      var index = this.asteroids.indexOf(movingObject);
      this.asteroids.splice(index, 1);
    } else if (movingObject instanceof Asteroids.Bullet) {
      var index = this.bullets.indexOf(movingObject);
      this.bullets.splice(index, 1);
    }
  }

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  }

  Game.prototype.updateScore = function() {
    this.scoreboard.update();
  }
  
  Game.prototype.wrap = function(pos) {
    var x = pos[0], y = pos[1];
    
    if (x > DIM_X) {
      return [x - DIM_X + 5, y];
    }

    if (x <= 5) {
      return [DIM_X - 1, y];
    }
    
    if (y > DIM_Y) {
      return [x, y - DIM_Y + 5];
    }

    if (y <= 5) {
      return [x, DIM_Y - 1];
    }
  
    return pos;
  }
  
  
})();