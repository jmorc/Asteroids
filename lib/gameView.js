(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  
  var GameView = Asteroids.GameView = function () {
    this.game = new Asteroids.Game();
    this.ctx = null;
  }
  
  GameView.prototype.start = function () {
    // this.ctx = canvasEl.getContext("2d");
  
    window.setInterval((function () {
      this.game.step();
      this.game.draw(this.ctx);
    }).bind(this), 20);
  }
  
})();
