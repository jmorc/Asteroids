(function(){

  if ( typeof Asteroids === 'undefined' ) {
	window.Asteroids = {};
  }

  RADIUS = 5;

  var Bullet = Asteroids.Bullet = function(attr) {
      this.radius = RADIUS,
      this.pos = attr["pos"],
      Asteroids.MovingObject.call(this,  { pos: attr["pos"], 
                                           vel: attr["vel"], 
                                           radius: this.radius, 
                                           game: attr["game"] });                         
   }; 
  
  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.draw = function (ctx) {
      ctx.save();  
      ctx.translate(this.pos[0], this.pos[1])

      if ( this.vel[0] > 0 ) {
        var bullet_angle = Math.atan(this.vel[1] / this.vel[0]);
      } else if ( this.vel[0] < 0 ) {
        var bullet_angle =  Math.PI + Math.atan(this.vel[1] / this.vel[0]);
      } else {
        bullet_angle = 0;
      }
      
      ctx.rotate(bullet_angle);
      ctx.drawImage(Asteroids.bullet_img, -10, -10, 20, 20);
      ctx.restore();
  }

  Bullet.prototype.isWrappable = false;
 })();