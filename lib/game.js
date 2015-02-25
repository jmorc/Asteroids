(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  
  var DIM_X = 820, DIM_Y = 400, NUM_ASTEROIDS = 6;
  
  var Game = Asteroids.Game = function() {
    this.asteroids = []; //this.addAsteroids(NUM_ASTEROIDS);
    this.game_time = 0;
    this.bullets = [];
    this.isPaused = false;
    this.explosions = [];
    this.audiochannels = [];
    this.initializeAudio();
    this.scoreboard = new Asteroids.Scoreboard(5);
    this.ship = new Asteroids.Ship({
                              pos: [200, 200], 
                              game: this
                            });
  }

  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship])
                         .concat(this.bullets)
                         .concat(this.explosions);
  }
  
  Game.prototype.checkCollisions = function() {
    for (var i = 0; i < this.allObjects().length; i++) {
      for (var j = i + 1; j < this.allObjects().length; j++) {
        this.allObjects()[i].isCollidedWith(this.allObjects()[j]);
      }
    }
  };
  
  Game.prototype.clearArea = function(pos, radius) {
      this.asteroids.forEach(function(asteroid){
        if ( ((asteroid.pos[0] >= pos[0] - radius) &&
             (asteroid.pos[0] <= pos[0] + radius)) &&
             ((asteroid.pos[1] >= pos[1] - radius) &&
             (asteroid.pos[1] <= pos[1] + radius)) ) {
          this.remove(asteroid)
        }
      }, this)
  }

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0,  DIM_X, DIM_Y);
    ctx.drawImage(Asteroids.background_img, 0, 0, 800, 400);
    this.allObjects().forEach(function(obj) {
      obj.draw(ctx);
    });

  }

  Game.prototype.initializeAudio = function() {
    var channel_max = 10;                   
    this.audiochannels = new Array();
    for ( var a = 0; a < channel_max; a++) {                 
      this.audiochannels[a] = new Array();
      this.audiochannels[a]['channel'] = new Audio();            
      this.audiochannels[a]['finished'] = -1;              
    }
  }

  Game.prototype.isOutOfBounds = function(pos) {
    if ( (pos[0] < 3 || pos[1] < 3) || (pos[0] > DIM_X - 3 || pos[1] > DIM_Y - 3) ) {
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
  
  Game.prototype.pause = function(){
    console.log(this.isPaused)
    this.isPaused ? this.isPaused = false : this.isPaused = true;
  };

  Game.prototype.play_multi_sound = function(s) {
    for ( var a = 0; a < this.audiochannels.length; a++ ) {
      thistime = new Date();
      if ( this.audiochannels[a]['finished'] < thistime.getTime() ) {     
                                       + document.getElementById(s).duration * 1000;
        this.audiochannels[a]['channel'].src = document.getElementById(s).src;
        this.audiochannels[a]['channel'].load();
        this.audiochannels[a]['channel'].play();
        break;
      }
    }
  }

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
    } else if (movingObject instanceof Asteroids.Explosion) {
      var index = this.explosions.indexOf(movingObject);
      this.explosions.splice(index, 1);
    }
  }

  Game.prototype.step = function() {
    if ( this.isPaused !== true ) {
      this.moveObjects();
      this.checkCollisions();
      this.game_time += 20;
      var time = this.game_time;
      if (time % 6000 === 0 || time === 2000  )  {
        this.insertAsteroid({pos: [810, Math.random(400)], size: 'big'});
      }
    }
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