(function() {
	
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  Asteroids.big_asteroid_img = new Image();
  Asteroids.big_asteroid_img.onload = function () {
  ctx.drawImage(Asteroids.big_asteroid_img, 0, 0);
  };
  Asteroids.big_asteroid_img.src = 'img/big_asteroid.png';

  Asteroids.medium_asteroid_img = new Image();
  Asteroids.medium_asteroid_img.onload = function () {
  ctx.drawImage(Asteroids.medium_asteroid_img, 0, 0);
  };
  Asteroids.medium_asteroid_img.src = 'img/medium_asteroid.png';

  Asteroids.small_asteroid_img = new Image();
  Asteroids.small_asteroid_img.onload = function () {
  ctx.drawImage(Asteroids.small_asteroid_img, 0, 0);
  };
  Asteroids.small_asteroid_img.src = 'img/small_asteroid.png';

  Asteroids.bullet_img = new Image();
  Asteroids.bullet_img.onload = function () {
  ctx.drawImage(Asteroids.bullet_img, 0, 0);
  };
  Asteroids.bullet_img.src = 'img/bullet.png'; 

  Asteroids.background_img = new Image();
  Asteroids.background_img.onload = function () {
  ctx.drawImage(Asteroids.background_img, 0, 0);
  };
  Asteroids.background_img.src = 'img/brown-paper.jpg';

  Asteroids.ship_img = new Image();
  Asteroids.ship_img.onload = function () {
  ctx.drawImage(Asteroids.ship_img, 0, 0);
  };
  Asteroids.ship_img.src = 'img/ship.png';

  Asteroids.explode_img = new Image();
  Asteroids.explode_img.onload = function () {
  ctx.drawImage(Asteroids.explode_img, 0, 0);
  };
  Asteroids.explode_img.src = 'img/explosion.png';
})();