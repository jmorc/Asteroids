(function(){

  if ( typeof Asteroids === 'undefined' ) {
	window.Asteroids = {};
  }

  var Explosion = Asteroids.Explosion = function(attr) {
      this.age = 1;
      this.rotational_pos = 0;
      this.isRotatable = true;
      this.rotational_vel = attr["rotational_vel"]
      Asteroids.MovingObject.call(this,  { pos: attr["pos"], 
                                           vel: [0, 0], 
                                           radius: 0, 
                                           game: attr["game"] 
                                         });                         
   }; 
  
  Asteroids.Util.inherits(Explosion, Asteroids.MovingObject);

  Explosion.prototype.draw = function (ctx) {
      ctx.save();  
      ctx.translate(this.pos[0], this.pos[1])

      ctx.rotate(this.rotational_pos);
      ctx.drawImage(Asteroids.explode_img, -90, -90, 180, 180);
      ctx.restore();     
  }


 })();