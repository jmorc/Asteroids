(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var COLOR = "#ccffff";
  var RADIUS = 10;

  var Ship = Asteroids.Ship = function(attr) {
      this.color = COLOR,
      this.radius = RADIUS,
      this.pos = attr["pos"],
      Asteroids.MovingObject.call(this,  { pos: attr["pos"], 
                                           vel: [0, 0], 
                                           radius: this.radius, 
                                           color: this.color,
                                           game: attr["game"] });                         
   }; 
    
  
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);
  
  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };
  
  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function() {
    var vel = this.vel.slice(0).map(function(el) { return el * 3 });
    var pos = this.pos.slice(0);
    var attr = {
      vel: vel,
      pos: pos,
      game: this.game
    };

    var bullet = new Asteroids.Bullet(attr);
    this.game.bullets.push(bullet);

  };

})();