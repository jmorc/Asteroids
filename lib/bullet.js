(function(){

  if ( typeof Asteroids === 'undefined' ) {
	window.Asteroids = {};
  }

  COLOR = "#ccffcc";
  RADIUS = 5;

  var Bullet = Asteroids.Bullet = function(attr) {
      this.color = COLOR,
      this.radius = RADIUS,
      this.pos = attr["pos"],
      Asteroids.MovingObject.call(this,  { pos: attr["pos"], 
                                           vel: attr["vel"], 
                                           radius: this.radius, 
                                           color: this.color,
                                           game: attr["game"] });                         
   }; 
  
  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.isWrappable = false;

 })();