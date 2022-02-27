const OnScreenElement = require('./on_screen_element.js')

class Arrow extends OnScreenElement {
  constructor(arrowOpts) {
    super(arrowOpts);
    this.game = arrowOpts['game'];
    this.direction = arrowOpts['direction'];
    this.rotation = this.getRotation();
    this.pos = arrowOpts['position'];
    this.setHorizPos();
    // even though velocity has 2 nums, we'll only be using the Y since arrows
    // will only be moving upwards
    this.velocity = arrowOpts['velocity'] || [0, 0];
    this.scale = .25;
    this.size = 268 * this.scale;
    this.img = this.preloadImg();
    this.isATarget = arrowOpts['target'] || false;
    this.quantization;
  }

  setHorizPos() {
    let start = this.pos[0];
    let gap = 75;
    switch(this.direction) {
      case 'left':
        this.pos[0] = start;
        break;
      case 'down':
        this.pos[0] = start + gap;
        break;
      case 'up':
        this.pos[0] = start + (gap * 2);
        break;
      case 'right':
        this.pos[0] = start + (gap * 3);
        break;
    }
  }

  preloadImg() {
    let img = new Image();
    img.addEventListener('load', () => {
      // set scale and origin
    })
    img.src = this.imgUrl;
    return img;
  }
  
  // This is hard-coded for 4 panels. need to refactor to make scalable
  render(ctx) {
    let scale = this.scale;
    let [x, y] = this.pos;
    let rotation = this.rotation;
    let img = this.img;

    ctx.setTransform(scale, 0, 0, scale, x, y);
    ctx.rotate(rotation);
    ctx.drawImage(img, -this.img.width / 2, -this.img.height / 2)
    ctx.setTransform(1,0,0,1,0,0)
  }

  move() {
    let [x, y] = this.pos;
    let [a, b] = this.velocity;
    this.pos = [x + a, y + b];
  }

  // This is hard-coded for 4 panels, need to refactor to make scalable
  getRotation() {
    switch (this.direction) {
      case 'left':
        return Math.PI / 2
      case 'down':
        return 0
      case 'up':
        return Math.PI
      case 'right':
        return Math.PI * 1.5
    }
  }

  getDistance(otherArrow) {
    let ourY = this.pos[1];
    let theirY = otherArrow.pos[1];
    return theirY - ourY
  }

  setQuantization(quantization) {
    this.quantization = quantization;
  }

  colorPicker() {
    let color = "";
    if (!this.isATarget) {
      color = "grey"
    } else {
      switch (this.quantization) {
        case 4:

        case 8:

        case 16:

        case 32:

      }
    }
  }
}

module.exports = Arrow;