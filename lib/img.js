(function() {
	
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

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

  Asteroids.asteroid_img = new Image();
  Asteroids.asteroid_img.onload = function () {
  ctx.drawImage(Asteroids.asteroid_img, 0, 0);
  };

  Asteroids.asteroid_img.src = 'img/big_asteroid.png';


})();