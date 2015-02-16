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
  
  MovingObject.prototype.collideWith = function(otherObject) {
  }

  
  
  MovingObject.prototype.move = function () {
    var pos = this.game.wrap(this.pos)
    this.pos[0] = Math.abs(pos[0] + this.vel[0]);
    this.pos[1] = Math.abs(pos[1] + this.vel[1]);
  }
  
})();