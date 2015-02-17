(function() {
	
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  Asteroids.img = new Image();
  Asteroids.img.onload = function () {
  ctx.drawImage(Asteroids.img, 0, 0);
  };

  Asteroids.img.src = 'img/brown-paper.jpg';


})();