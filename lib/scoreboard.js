(function(){

  if ( typeof Asteroids === 'undefined' ) {
	window.Asteroids = {};
  }

  var Scoreboard = Asteroids.Scoreboard = function(lives) {
    this.lives = lives;
    this.points = 0;
  }

  Scoreboard.prototype.update = function(){
    document.getElementById("lives").innerHTML = this.lives.toString();
    document.getElementById("points").innerHTML = this.points.toString();
  }
})();