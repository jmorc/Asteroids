(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  
  var GameView = Asteroids.GameView = function () {
    this.game = new Asteroids.Game();
    this.ctx = null;
    this.bindKeyHandlers();
  }
  
  GameView.prototype.start = function () {
    window.setInterval((function () {
      this.game.step();
      this.game.draw(this.ctx);
      this.game.updateScore();
      this.game.isOver();
    }).bind(this), 20);
  }

  GameView.prototype.bindKeyHandlers = function() {
    var ship = this.game.ship;
    var game = this.game;
    key('left', function(){ ship.power([-0.8, 0]) });
    key('right', function(){ ship.power([0.8, 0]) });
    key('up', function(){ ship.power([0, -0.8]) });
    key('down', function(){ ship.power([0, 0.8]) });
    key('f', function(){ ship.fireBullet() });
    key('p', function(){ game.pause() });
  }
})();