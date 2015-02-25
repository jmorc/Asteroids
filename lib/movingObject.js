(function(){

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var MovingObject = Asteroids.MovingObject = function(attributes) { 
    this.pos = attributes.pos;
    this.vel = attributes.vel;
    this.radius = attributes.radius;
    this.color = attributes.color;
    this.game = attributes.game;
  }

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  }
  
  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var dxSqu = Math.pow((this.pos[0] - otherObject.pos[0]), 2);   
    var dySqu = Math.pow((this.pos[1] - otherObject.pos[1]), 2);
    var distance = Math.sqrt(dySqu + dxSqu);

  if (distance < (this.radius + otherObject.radius)) {
      this.collideWith(otherObject);
      return true;
    }
    return false;
  }

  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.isRotatable = false;
  
  MovingObject.prototype.collideWith = function(otherObject) {
  }
  
  MovingObject.prototype.move = function () {
    if ( this.game.isOutOfBounds(this.pos) ) {
      if ( this.isWrappable ) {
        var pos = this.game.wrap(this.pos)
      } else {
        this.game.remove(this);
        return false; 
      }
    } else {
      var pos = this.pos.slice(0);
    }

    this.pos[0] = Math.abs(pos[0] + this.vel[0]);
    this.pos[1] = Math.abs(pos[1] + this.vel[1]); 

    if ( this.isRotatable ) { 
      this.rotational_pos += Math.PI/50 * this.rotational_vel;
    }

    if ( this instanceof Asteroids.Explosion ) {
      this.age -= 0.1;
      if ( this.age <= -0.4 ) this.game.remove(this);
    }

    if ( this instanceof Asteroids.Bullet ) {
      if ( (this.pos[0] <= 10 || this.pos[1] <= 10) ||
            this.vel[0] === 0 && this.vel[1] === 0  ) {
        this.game.remove(this);
      }
    }
  }
})();