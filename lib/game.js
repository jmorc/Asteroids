(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  
  var DIM_X = 800, DIM_Y = 300, NUM_ASTEROIDS = 10;
  
  var Game = Asteroids.Game = function() {
    this.asteroids = this.addAsteroids();
    this.bullets = [];
    this.ship = new Asteroids.Ship({
                              pos: this.randomPosition(), 
                              game: this
                            });
  }

  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship]).concat(this.bullets);
  }
  
  Game.prototype.addAsteroids = function () {
    var asteroids_arr = [];
    for (var i = 0; i < NUM_ASTEROIDS; i++) {
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
    this.allObjects().forEach(function(obj) {
      obj.draw(ctx);
    });
  }

  Game.prototype.isOutOfBounds = function(pos) {
    if ( (pos[0] < 3 || pos[1] < 3) || (pos[0] > DIM_X - 3 || pos[1] > DIM_Y - 3) ) {
      return true;
    }
    return false;
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
      console.log('removing bullet')
      var index = this.bullets.indexOf(movingObject);
      this.bullets.splice(index, 1);
    }
  }

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  }
  
  Game.prototype.wrap = function(pos) {
    var x = pos[0], y = pos[1];
    
    if (x > DIM_X) {
      return [x - DIM_X + 5, y];
    }

    if (x <= 5) {
      return [DIM_X - 5, y];
    }
    
    if (y > DIM_Y) {
      return [x, y - DIM_Y + 5];
    }

    if (y <= 5) {
      return [x, DIM_Y - 5];
    }
  
    return pos;
  }
  
  
})();