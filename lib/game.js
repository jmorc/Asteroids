(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  
  var DIM_X = 800, DIM_Y = 600, NUM_ASTEROIDS = 100;
  
  var Game = Asteroids.Game = function() {
    this.asteroids = this.addAsteroids();
    
    this.ship = new Asteroids.Ship({ pos: this.randomPosition(), game: this} );
  }

  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship]);
  }
  
  Game.prototype.checkCollisions = function() {
    for (var i = 0; i < this.allObjects.length; i++) {
      for (var j = i + 1; j < this.allObjects.length; j++) {
        this.allObjects[i].collideWith(this.allObjects[j]);
      }
    }
  };
  
  Game.prototype.addAsteroids = function () {
    var asteroids_arr = [];
    for (var i = 0; i < NUM_ASTEROIDS; i++) {
      var pos = this.randomPosition();
      var asteroid = new Asteroids.Asteroid( { pos: pos, game: this} );
      asteroids_arr.push(asteroid); 
    }
    return asteroids_arr;
  };
  
  Game.prototype.randomPosition = function () {
    var xPos = Math.floor(Math.random() * DIM_X);
    var yPos = Math.floor(Math.random() * DIM_Y);
    return [xPos, yPos]; 
  };
  
  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0,  DIM_X, DIM_Y);
    this.allObjects().forEach(function(obj) {
      obj.draw(ctx);
    });
  }
  
  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function(obj) {
      obj.move();
    });
  };
  
  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  }
  
  Game.prototype.remove = function(asteroid) {
    var index = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(index, 1);
  }
  
  Game.prototype.wrap = function(pos) {
    var x = pos[0], y = pos[1];
    
    if (x > DIM_X) {
      return [x - DIM_X, y];
    }
    
    if (y > DIM_Y) {
      return [x, y - DIM_Y];
    }
  
    return pos;
  }
  
  
})();