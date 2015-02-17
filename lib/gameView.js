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
    // this.ctx = canvasEl.getContext("2d");
  
    window.setInterval((function () {
      this.game.step();
      this.game.draw(this.ctx);
    }).bind(this), 20);
  }

  GameView.prototype.bindKeyHandlers = function() {
    var ship = this.game.ship;
    key('left', function(){ ship.power([-0.6, 0]) });
    key('right', function(){ ship.power([0.6, 0]) });
    key('up', function(){ ship.power([0, -0.6]) });
    key('down', function(){ ship.power([0,0.6]) });
    key('space', function(){ ship.fireBullet() });
  }
  
})();