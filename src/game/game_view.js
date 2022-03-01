const Game = require("./game");
const Keymaster = require('../keymaster.js');

class GameView {
  constructor(gameOpts) {
    this.game = new Game(gameOpts);
    this.ctx = ctx;
    this.prevVolume = 0;
  }

  start(difficulty) {
    // optimized for the 9 idk
    this.game.getStepsAndCount(difficulty);
    let startPoint = 0;
    switch (difficulty) {
      case 2: case 3:
        startPoint = 5058;
        break;
      case 6: case 8: case 9:
        startPoint = 3240;
        break;
    }
    setInterval(() => {
      this.game.step();
    }, 20);
    console.log(startPoint)
    setTimeout(() => {
      this.playAudio();
      this.changeVolume(.05);
    }, startPoint) // this delay is only for the 9
    this.game.startChart();
  }

  playAudio() {
    this.audio = this.game.chart.audio;
    this.audio.play();  
  }

  changeVolume(num) {
    this.audio.volume = num;
  }

  bindKeys() {
    key('left', () => this.game.checkKeyPress('left'));
    key('down', () => this.game.checkKeyPress('down'));
    key('up', () => this.game.checkKeyPress('up'));
    key('right', () => this.game.checkKeyPress('right'));
  }
}

module.exports = GameView;