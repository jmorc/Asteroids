(function() {
	
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  Asteroids.big_asteroid_img = new Image();
  Asteroids.big_asteroid_img.src = 'img/big_asteroid.png';

  Asteroids.medium_asteroid_img = new Image();
  Asteroids.medium_asteroid_img.src = 'img/medium_asteroid.png';

  Asteroids.small_asteroid_img = new Image();
  Asteroids.small_asteroid_img.src = 'img/small_asteroid.png';

  Asteroids.bullet_img = new Image();
  Asteroids.bullet_img.src = 'img/bullet.png'; 

  Asteroids.background_img = new Image();
  Asteroids.background_img.src = 'img/brown-paper.jpg';

  Asteroids.ship_img = new Image();
  Asteroids.ship_img.src = 'img/ship.png';

  Asteroids.explode_img = new Image();
  Asteroids.explode_img.src = 'img/explosion.png';
})();